import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {Button, ERC20TokenReceived} from '../../components';
import {BasketInput, BasketShares} from '../../components/basket';
import {useContract, useWallet} from '../../context';

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

export const Mint: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();
  const wallet = useWallet();

  const [mintable, setMintable] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<Record<string, {amount: BigNumber, available: boolean}>>({});
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0));
  const [estimatedGas, setEstimatedGas] = React.useState<BigNumber>(new BigNumber(0));

  React.useEffect(() => {
    contract.token.getBalance(wallet.account).then(setBalance);
  }, [contract, wallet]);

  React.useEffect(() => {
    let mintable;
    if (Object.entries(values).length === 0) {
      mintable = false;
    } else {
      mintable = Object.values(values).filter((v) => !v.available).length === 0;
    }
    setMintable(mintable);
    if (mintable) {
      estimateGas();
    }
  }, [values]);

  const onValuesChanged = (values: Record<string, {amount: BigNumber, available: boolean}>) => {
    if (Object.keys(values).length === 0) {
      setAmount(new BigNumber(0));
    } else {
      setAmount(Object.entries(values).map(([_, v]) => v.amount).reduce((pv, cv) => pv.plus(cv)));
    }
    setValues(values);
  };

  const estimateGas = () => {
    generateMintRequest().then(request => {
      if (Object.entries(request).length > 0) {
        contract.manager.estimateMintGas(request).then(gas => {
          setEstimatedGas(gas);
        });
      }
    });
  }

  const generateMintRequest = async () : Promise<Record<string, BigNumber>> => {
    const request: Record<string, BigNumber> = {};
    for (const symbol of Object.keys(values)) {
      const amount = values[symbol].amount;
      if (amount.gt(new BigNumber(0))) {
        const token = await contract.vault.getToken(symbol);
        request[token.contract.address] = amount.shiftedBy(token.decimals);
      }
    }
    return request;
  };

  const onMint = async () => {
    if (amount.lte(new BigNumber(0))) {
      // TODO: handle exception
      console.error('Amount should be greater than 0');
      return;
    }
    setMintable(false);
    try {
      const request: Record<string, BigNumber> = await generateMintRequest();
      //await contract.hToken.mintMulti(request);
      await contract.manager.mint(request);

    } catch (ex) {
      // TODO: handle exception
      console.error(ex);
    }
    setMintable(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>MINT hUSD</p>
        <p className={classes.subTitle}>Deposit stablecoins, get hUSD at 1:1 ratio.</p>
      </div>
      <div className={classes.poolInput}>
        <BasketInput spender={contract.manager.address} onValuesChanged={onValuesChanged}/>
      </div>
      <div className={classes.to}><img src={'/assets/icon/arrow-down.svg'} alt={'to'}/></div>
      <div className={classes.received}>
        <ERC20TokenReceived amount={amount} contract={contract.token}/>
      </div>
      <div className={classes.summary}>
        <p><span className={classes.summaryLeading}>Current balance</span><span
          className={classes.summaryAmount}>{Numbers.format(balance)}</span><span
          className={classes.summaryUnit}>hUSD</span></p>
        <p><span className={classes.summaryLeading}>New balance</span><span
          className={classes.summaryAmount}>{Numbers.format(balance.plus(amount))}</span><span
          className={classes.summaryUnit}>hUSD</span></p>
      </div>
      <div className={classes.action}>

        <p><Button label={'MINT hUSD'} disabled={!mintable} onClick={onMint}/></p>
        <p>Estimated Gas Fee: {Numbers.format(estimatedGas, {decimals: 8})} ETH</p>
      </div>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};