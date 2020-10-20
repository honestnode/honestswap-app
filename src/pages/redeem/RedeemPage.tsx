import BigNumber from 'bignumber.js';
import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {
  BasketExpect,
  BasketReceived,
  BasketShares,
  Checkbox,
  ERC20TokenInput,
  ERC20TokenUsed,
  TransactionButton
} from '../../components';
import {useBasket, useContract, useEthereum} from '../../context';

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
  inputForm: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto`
  },
  proportion: {
    marginTop: `${theme.spacing()}px`,
    paddingLeft: `${theme.spacing(2)}px`
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
    margin: `${theme.spacing(4)}px auto`
  },
  receivedItem: {
    marginBottom: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginBottom: 0
    }
  },
  fee: {
    textAlign: 'right',
    fontSize: '14px',
    color: theme.palette.textLighter,
    marginTop: `${theme.spacing(2)}px`
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

export const RedeemPage: React.FC = () => {

  const classes = useStyles();
  const ethereum = useEthereum();
  const contract = useContract();
  const basket = useBasket();

  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0));
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [tokenAmounts, setTokenAmounts] = React.useState<Record<string, BigNumber>>({});
  const [proportion, setProportion] = React.useState<boolean>(true);
  const [feeRate, setFeeRate] = useState<BigNumber>(new BigNumber(0));
  const [transactionRequest, setTransactionRequest] = React.useState<BigNumber | Record<string, BigNumber>>();

  React.useEffect(() => {
    contract.honestAsset.contract.getBalance(ethereum.account).then(setBalance);
    contract.honestConfiguration.getRedeemFeeRate().then(feeRate => setFeeRate(feeRate.shiftedBy(-18)));
  }, [contract, ethereum, basket]);

  useEffect(() => {
    if (amount.gt(new BigNumber(0))) {
      const request = generateTransactionRequest();
      setTransactionRequest(request);
    }
  }, [amount]);

  const onProportionChanged = (value: boolean): void => {
    setProportion(value);
    setTokenAmounts({});
    setAmount(new BigNumber(0));
  };

  const onAmountsChanged = (amounts: Record<string, BigNumber>) => {
    setTokenAmounts(amounts);
    const amount = Object.entries(amounts).reduce((r, [_, value]) => r.plus(value), new BigNumber(0));
    setAmount(amount.multipliedBy(new BigNumber(1).plus(feeRate)));
  };

  const generateTransactionRequest = (): BigNumber | Record<string, BigNumber> => {
    if (proportion) {
      return amount.shiftedBy(contract.honestAsset.decimals);
    } else {
      const request: Record<string, BigNumber> = {};
      for (const symbol of Object.keys(tokenAmounts)) {
        const amount = tokenAmounts[symbol];
        if (amount.gt(new BigNumber(0))) {
          const token = basket.findAsset(symbol);
          if (token) {
            request[token.address] = amount.shiftedBy(token.decimals);
          }
        }
      }
      return request;
    }
  };

  const estimateGas = async (request: BigNumber | Record<string, BigNumber>) => {
    if (request instanceof BigNumber) {
      return contract.honestAssetManager.estimateRedeemProportionallyGas(request);
    } else {
      return contract.honestAssetManager.estimateRedeemManuallyGas(request);
    }
  };

  const execution = async (request: BigNumber | Record<string, BigNumber>) => {
    if (request instanceof BigNumber) {
      return contract.honestAssetManager.redeemProportionally(request);
    } else {
      return contract.honestAssetManager.redeemManually(request);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>REDEEM hUSD</p>
        <p className={classes.subTitle}>Withdraw stablecoins to your wallet.</p>
      </div>
      <div className={classes.inputForm}>
        {proportion ?
          <ERC20TokenInput onValueChanged={setAmount} token={contract.honestAsset}
                           spender={contract.honestAssetManager.address}/> :
          <ERC20TokenUsed token={contract.honestAsset} value={amount}/>}
        <p className={classes.proportion}>
          <Checkbox label={'Redeem with all assets proportionally'} initialValue={proportion}
                    onValueChanged={onProportionChanged}/>
        </p>
      </div>
      <div className={classes.to}><img src={'/assets/icon/arrow-down.svg'} alt={'to'}/></div>
      <div className={classes.received}>
        {proportion ?
          <BasketReceived amount={amount} onAmountsChanged={setTokenAmounts}/> :
          <>
            <BasketExpect amount={balance} onAmountsChanged={onAmountsChanged}/>
            <p className={classes.fee}>Redeem Fee: {Numbers.format(feeRate, {percentage: true})}</p>
          </>
        }
      </div>
      <TransactionButton className={classes.action} label={'REDEEM hUSD'} execution={execution}
                         request={transactionRequest} calculateGas={estimateGas}/>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};

