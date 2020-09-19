import BigNumber from 'bignumber.js';
import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {BasketShares, BasketTokenSelect, ERC20TokenInput, ERC20TokenReceived} from '../../components';
import {Button} from '../../components/button';
import {useContract} from '../../context';
import {BasketToken} from '../../contract';

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

export const Swap: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();

  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [tokenFrom, setTokenFrom] = useState<BasketToken>();
  const [tokenTo, setTokenTo] = useState<BasketToken>();
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));

  React.useEffect(() => {
    setAmount(new BigNumber(0));
  }, [tokenFrom, tokenTo]);

  const onSwap = async () => {
    if (amount.lte(new BigNumber(0))) {
      // TODO: handle exception
      console.error('Amount should be greater than 0');
      return;
    }
    setRequesting(true);
    if (tokenFrom !== undefined && tokenTo !== undefined) {
      try {
        const decimals = await tokenFrom.contract.getDecimals();
        await contract.swap.swap(tokenFrom.contract.address, tokenTo.contract.address, amount.shiftedBy(decimals));
      } catch (ex) {
        // TODO: handle exception
        console.error(ex);
      }
    }
    setRequesting(false);
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
        {tokenFrom && <ERC20TokenInput value={amount} onValueChanged={setAmount} contract={tokenFrom.contract}/>}
      </div>
      <div className={classes.arrow}><img src={'/assets/icon/arrow-down.svg'} alt={'to'}/></div>
      <div className={classes.to}>
        <BasketTokenSelect className={classes.toSelect} value={-1} excludes={tokenFrom ? [tokenFrom] : []}
                           onTokenSelected={setTokenTo}/>
        {tokenTo && <ERC20TokenReceived amount={amount} contract={tokenTo.contract}/>}
      </div>
      <div className={classes.fee}>Swap Fee: 0.1%</div>
      <div className={classes.action}>
        <p><Button label={'SWAP'} disabled={requesting} onClick={onSwap}/></p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};