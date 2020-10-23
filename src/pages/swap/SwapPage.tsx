import BigNumber from 'bignumber.js';
import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {BasketAsset, Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {
  BasketShares,
  BasketTokenSelect,
  ERC20TokenInput,
  ERC20TokenReceived,
  TransactionButton
} from '../../components';
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
  from: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`
  },
  fromSelect: {
    padding: `${theme.spacing(2)}px 0`
  },
  fromForm: {},
  select: {
    marginLeft: `${theme.spacing(6)}px`,
    padding: 0,
    border: `none`
  },
  arrow: {
    textAlign: 'center',
    '& img': {
      width: '32px',
      height: '32px'
    }
  },
  to: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`
  },
  toSelect: {
    padding: `${theme.spacing(2)}px 0`,
    justifyContent: 'flex-end'
  },
  toForm: {},
  fee: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`,
    textAlign: 'right',
    fontSize: '14px',
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

interface SwapRequest {
  from: string;
  to: string;
  amount: BigNumber;
}

export const SwapPage: React.FC = () => {

  const classes = useStyles();
  const ethereum = useEthereum();
  const contract = useContract();
  const basket = useBasket();
  const terminal = useTerminal();

  const [tokenFrom, setTokenFrom] = useState<BasketAsset>();
  const [tokenTo, setTokenTo] = useState<BasketAsset>();
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0));
  const [feeRate, setFeeRate] = useState<BigNumber>(new BigNumber(0));
  const [transactionRequest, setTransactionRequest] = React.useState<SwapRequest>();

  useEffect(() => {
    contract.honestConfiguration.getSwapFeeRate().then(feeRate => setFeeRate(feeRate.shiftedBy(-18)));
  }, [ethereum]);

  React.useEffect(() => {
    setAmount(new BigNumber(0));
    getBalance();
  }, [tokenFrom, tokenTo, feeRate]);

  useEffect(() => {
    const request = generateTransactionRequest();
    setTransactionRequest(request);
  }, [amount]);

  const getBalance = async () => {
    if (tokenFrom && tokenTo) {
      const balance = await tokenFrom.contract.getBalance(ethereum.account);
      const maxBalance = basket.findBalance(tokenTo.symbol)?.balance.multipliedBy(new BigNumber(1).plus(feeRate)) || new BigNumber(0);
      setBalance(balance.lte(maxBalance) ? balance : maxBalance);
    }
  };

  const getExpectAmount = (): BigNumber => {
    return amount.multipliedBy(new BigNumber(1).minus(feeRate));
  };

  const generateTransactionRequest = (): SwapRequest | undefined => {
    if (tokenFrom && tokenTo && amount.gt(new BigNumber(0))) {
      return {
        from: tokenFrom.address,
        to: tokenTo.address,
        amount: amount.shiftedBy(tokenFrom.decimals)
      };
    }
    return undefined;
  };

  const approve = async (request: SwapRequest): Promise<boolean> => {
    const allowance = await tokenFrom?.contract.allowanceOf(ethereum.account, contract.honestAssetManager.address);
    if (allowance && allowance.lt(request.amount)) {
      terminal.info(`Please approve spending your ${tokenFrom?.name}...`, true);
      try {
        await tokenFrom?.contract.approve(contract.honestAssetManager.address, request.amount);
        terminal.success(`${tokenFrom?.name} spending approved`);
        return true;
      } catch (ex) {
        terminal.error(`User denied ${tokenFrom?.name} spending approve, abort`);
        return false;
      }
    }
    return true;
  };

  const estimateGas = async (request: SwapRequest): Promise<BigNumber> => {
    return contract.honestAssetManager.estimateSwapGas(request.from, request.to, request.amount);
  };

  const execution = async (request: SwapRequest) => {
    return await contract.honestAssetManager.swap(request.from, request.to, request.amount);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Swap Coins</p>
        <p className={classes.subTitle}>Swap stablecoins at 1:1 ratio, always.</p>
      </div>
      <div className={classes.from}>
        <BasketTokenSelect className={classes.fromSelect} value={0} excludes={tokenTo ? [tokenTo] : []}
                           onTokenSelected={setTokenFrom}/>
        {tokenFrom &&
        <ERC20TokenInput onValueChanged={setAmount} spender={contract.honestAssetManager.address} token={tokenFrom}
                         balance={balance}/>}
      </div>
      <div className={classes.arrow}><img src={'/assets/icon/arrow-down.svg'} alt={'to'}/></div>
      <div className={classes.to}>
        <BasketTokenSelect className={classes.toSelect} value={-1} excludes={tokenFrom ? [tokenFrom] : []}
                           onTokenSelected={setTokenTo}/>
        {tokenTo && <ERC20TokenReceived amount={getExpectAmount()} token={tokenTo}/>}
      </div>
      <div className={classes.fee}>Swap Fee: {Numbers.format(feeRate, {percentage: true})}</div>
      <TransactionButton className={classes.action} label={'SWAP'} contract={contract.honestAssetManager} approve={approve} execution={execution}
                         request={transactionRequest} calculateGas={estimateGas}/>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};