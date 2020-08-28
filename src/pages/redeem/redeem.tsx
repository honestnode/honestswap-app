import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {Button, Checkbox, PoolShare, TokenReceived, TokenSend} from '../../components';
import {useAccount, useContract} from '../../context';

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
      height: '32px',
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
    color: theme.palette.textLighter
  },
  action: {
    textAlign: 'center',
    marginTop: `${theme.spacing(4)}px`,
    '& p': {
      marginBottom: `${theme.spacing()}px`,
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
  const account = useAccount();
  const balance = React.useMemo<BigNumber>(() => account.balance(contract.hUSD.address), [contract, account]);

  const [tokenAmounts, setTokenAmounts] = React.useState<Record<string, BigNumber>>({});
  const [proportion, setProportion] = React.useState<boolean>(true);

  const totalAmount = React.useMemo<BigNumber>(() => {
    if (Object.keys(tokenAmounts).length === 0) {
      return new BigNumber(0);
    }
    return Object.entries(tokenAmounts).map(([_, v]) => v).reduce((pv, cv) => pv.plus(cv));
  }, [tokenAmounts]);

  const onTotalAmountChanged = (amount: BigNumber): void => {
    setTokenAmounts(contract.tokens.reduce((pt, ct) => ({
      ...pt,
      [ct.name]: amount.multipliedBy(ct.share)
    }), {}));
  };

  const onTokenAmountChanged = (name: string, value: BigNumber): void => {
    setTokenAmounts({...tokenAmounts, [name]: value});
  };

  const getTokenMaxAmount = (name: string): BigNumber => {
    const remainTokenAmounts = Object.entries(tokenAmounts).filter(([k, _]) => k !== name);
    if (Object.keys(remainTokenAmounts).length === 0) {
      return balance;
    }
    return balance.minus(remainTokenAmounts.map(([_, v]) => v).reduce((pv, cv) => pv.plus(cv)));
  };

  const onProportionChanged = (value: boolean) => {
    setTokenAmounts({});
    setProportion(value);
  };

  const onRedeem = () => {};

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>REDEEM hUSD</p>
        <p className={classes.subTitle}>Withdraw stablecoins to your wallet.</p>
      </div>
      <div className={classes.inputForm}>
        <TokenSend icon={contract.hUSD.icon} name={contract.hUSD.name} readonly={!proportion}
                   amount={totalAmount} balance={balance} onValueChanged={onTotalAmountChanged}/>
        <p className={classes.proportion}>
          <Checkbox label={'Redeem with all assets proportionally'} initialValue={proportion}
                    onValueChanged={onProportionChanged}/>
        </p>
      </div>
      <div className={classes.to}><img src={'/assets/icon/arrow-down.svg'} alt={'to'} /></div>
      <div className={classes.received}>
        {contract.tokens.map(t => (
          <TokenReceived key={t.name} className={classes.receivedItem} readonly={proportion} name={t.name} icon={t.icon}
                         amount={tokenAmounts[t.name]} maxAmount={getTokenMaxAmount(t.name)}
                         onValueChanged={v => onTokenAmountChanged(t.name, v)}/>
        ))}
        {!proportion && <p className={classes.fee}>Redeem Fee: 0.1%</p>}
      </div>
      <div className={classes.action}>
        <p><Button label={'REDEEM hUSD'} onClick={onRedeem}/></p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
      <div className={classes.poolShare}>
        <PoolShare/>
      </div>
    </div>
  );
};

