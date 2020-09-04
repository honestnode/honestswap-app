import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {
  BasketExpect,
  BasketReceived,
  BasketShares,
  Button,
  Checkbox,
  ERC20TokenInput,
  ERC20TokenUsed
} from '../../components';
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

export const Redeem: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();
  const wallet = useWallet();

  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0));
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [tokenAmounts, setTokenAmounts] = React.useState<Record<string, BigNumber>>({});
  const [proportion, setProportion] = React.useState<boolean>(true);

  React.useEffect(() => {
    contract.hToken.getBalance(wallet.account).then(setBalance);
  }, [contract, wallet]);

  const onProportionChanged = (value: boolean): void => {
    setProportion(value);
    setTokenAmounts({});
    setAmount(new BigNumber(0));
  };

  const onAmountsChanged = (amounts: Record<string, BigNumber>) => {
    setTokenAmounts(amounts);
    setAmount(Object.entries(amounts).reduce((r, [_, value]) => r.plus(value), new BigNumber(0)));
  };

  const onRedeem = () => {
    console.log(tokenAmounts);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>REDEEM hUSD</p>
        <p className={classes.subTitle}>Withdraw stablecoins to your wallet.</p>
      </div>
      <div className={classes.inputForm}>
        {proportion ?
          <ERC20TokenInput value={amount} onValueChanged={setAmount} contract={contract.hToken}/> :
          <ERC20TokenUsed contract={contract.hToken} value={amount}/>}
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
            <p className={classes.fee}>Redeem Fee: 0.1%</p>
          </>
        }
      </div>
      <div className={classes.action}>
        <p><Button label={'REDEEM hUSD'} onClick={onRedeem}/></p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};

