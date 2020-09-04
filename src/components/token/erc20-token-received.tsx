import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {useWallet} from '../../context';
import {ERC20TokenLoading} from './erc20-token-loading';
import {ERC20TokenBalanceState, ERC20TokenComponentProps} from './token';
import {TokenHeader} from './token-header';

export interface ERC20TokenReceivedProps extends ERC20TokenComponentProps {
  amount: BigNumber;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    background: theme.palette.background,
    padding: `${theme.spacing()}px`
  },
  header: {
    flex: '0 0 120px'
  },
  label: {
    flex: 'auto',
    textAlign: 'right',
    marginRight: `${theme.spacing(2)}px`,
    color: theme.palette.textLighter
  },
  amount: {
    flex: '0 0 100px',
    width: '100px',
    padding: `${theme.spacing()}px`,
    border: 'none',
    textAlign: 'right'
  },
  spacer: {
    flex: '0 0 188px'
  }
}));

export const ERC20TokenReceived: FC<ERC20TokenReceivedProps> = props => {

  const {className, contract, amount} = props;
  const classes = useStyles();
  const wallet = useWallet();

  const [token, setToken] = useState<ERC20TokenBalanceState>();

  useEffect(() => {
    let r: ERC20TokenBalanceState = {} as never;
    Promise.all([
      contract.getName().then(name => r.name = name),
      contract.getSymbol().then(symbol => r.symbol = symbol),
      contract.getIcon().then(icon => r.icon = icon),
      contract.getBalance(wallet.account).then(balance => r.balance = balance)
    ]).then(() => {
      setToken({
        icon: r.icon,
        name: r.name,
        symbol: r.symbol,
        balance: r.balance
      });
    });
  }, [contract]);

  return token ? (
    <div className={clsx(classes.root, className)}>
      <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
      <span className={classes.label}>You will get</span>
      <span className={classes.amount}>{Numbers.format(amount)}</span>
      <span className={classes.spacer}/>
    </div>
  ) : <ERC20TokenLoading className={className}/>;
};