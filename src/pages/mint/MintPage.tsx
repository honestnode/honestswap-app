import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {ERC20TokenReceived, TransactionButton} from '../../components';
import {BasketInput, BasketShares} from '../../components/basket';
import {useBasket, useContract, useEthereum, useTerminal} from '../../context';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
  },
  title: {
    textAlign: 'center'
  },
  mainTitle: {
    color: theme.palette.textDarker,
    fontSize: '20px'
  },
  subTitle: {
    marginTop: `${theme.spacing(2)}px`
  },
  poolInput: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto`
  },
  to: {
    textAlign: 'center',
    '& img': {
      width: '32px',
      height: '32px'
    }
  },
  received: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`
  },
  summary: {
    maxWidth: '1024px',
    margin: `0 auto`,
    '& p': {
      display: 'flex',
      justifyContent: 'flex-end',
      marginBottom: `${theme.spacing(2)}px`,
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  summaryLeading: {
    flex: 'auto',
    textAlign: 'right',
    marginRight: `${theme.spacing()}px`,
    color: theme.palette.textLighter
  },
  summaryAmount: {
    flex: '0 0 100px',
    textAlign: 'right',
    marginRight: `${theme.spacing()}px`,
    color: theme.palette.textDarker
  },
  summaryUnit: {
    flex: '0 0 180px',
    marginLeft: `${theme.spacing(2)}px`,
    color: theme.palette.textLighter
  },
  action: {
    textAlign: 'center',
    marginTop: `${theme.spacing(4)}px`,
    '& p': {
      marginBottom: `${theme.spacing(2)}px`,
      color: theme.palette.textLighter,
      fontSize: '14px',
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  poolShare: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    margin: `${theme.spacing(4)}px auto`,
    paddingTop: `${theme.spacing(2)}px`
  }
}));

export const MintPage: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();
  const ethereum = useEthereum();
  const basket = useBasket();
  const terminal = useTerminal();

  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0));
  const [values, setValues] = React.useState<Record<string, BigNumber>>({});
  const [totalValue, setTotalValue] = React.useState<BigNumber>(new BigNumber(0));
  const [transactionRequest, setTransactionRequest] = React.useState<Record<string, BigNumber>>();

  React.useEffect(() => {
    contract.honestAsset.contract.getBalance(ethereum.account).then(setBalance);
    setValues({});
    setTotalValue(new BigNumber(0));
    setTransactionRequest(undefined);
  }, [contract, ethereum]);

  React.useEffect(() => {
    const request = generateTransactionRequest();
    if (Object.entries(request).length > 0) {
      setTransactionRequest(request);
    } else {
      setTransactionRequest(undefined);
    }
  }, [values]);

  const onValuesChanged = (values: Record<string, BigNumber>) => {
    if (Object.keys(values).length === 0) {
      setTotalValue(new BigNumber(0));
    } else {
      setTotalValue(Object.values(values).reduce((pv, cv) => pv.plus(cv)));
    }
    setValues(values);
  };

  const generateTransactionRequest = () : Record<string, BigNumber> => {
    const request: Record<string, BigNumber> = {};
    for (const symbol of Object.keys(values)) {
      const amount = values[symbol];
      if (amount.gt(new BigNumber(0))) {
        const token = basket.findAsset({symbol: symbol});
        if (token) {
          request[token.address] = amount.shiftedBy(token.decimals);
        }
      }
    }
    return request;
  };

  const approve = async (request: Record<string, BigNumber>): Promise<boolean> => {
    for(const [asset, amount] of Object.entries(request)) {
      const token = basket.findAsset({address: asset});
      const allowance = await token?.contract.allowanceOf(ethereum.account, contract.honestAssetManager.address);
      if (allowance && allowance.lt(amount)) {
        terminal.info(`Please approve spending your ${token?.name}...`, true);
        try {
          await token?.contract.approve(contract.honestAssetManager.address, amount);
          terminal.success(`${token?.name} spending approved`);
        } catch (ex) {
          terminal.error(`User denied ${token?.name} spending approve, abort`);
          return false;
        }
      }
    }
    return true;
  };

  const estimateGas = async (request: Record<string, BigNumber>) => {
    return contract.honestAssetManager.estimateMintGas(request);
  }

  const execution = async (request: Record<string, BigNumber>) => {
    return await contract.honestAssetManager.mint(request);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>MINT hUSD</p>
        <p className={classes.subTitle}>Deposit stablecoins, get hUSD at 1:1 ratio.</p>
      </div>
      <div className={classes.poolInput}>
        <BasketInput spender={contract.honestAssetManager.address} onValuesChanged={onValuesChanged}/>
      </div>
      <div className={classes.to}><img src={'/assets/icon/arrow-down.svg'} alt={'to'}/></div>
      <div className={classes.received}>
        <ERC20TokenReceived token={contract.honestAsset} amount={totalValue}/>
      </div>
      <div className={classes.summary}>
        <p><span className={classes.summaryLeading}>Current balance</span><span
          className={classes.summaryAmount}>{Numbers.format(balance)}</span><span
          className={classes.summaryUnit}>hUSD</span></p>
        <p><span className={classes.summaryLeading}>New balance</span><span
          className={classes.summaryAmount}>{Numbers.format(balance.plus(totalValue))}</span><span
          className={classes.summaryUnit}>hUSD</span></p>
      </div>
      <TransactionButton className={classes.action} label={'MINT hUSD'} contract={contract.honestAssetManager} approve={approve} execution={execution} request={transactionRequest} calculateGas={estimateGas} />
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};