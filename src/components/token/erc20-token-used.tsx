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

export interface ERC20TokenUsedProps extends ERC20TokenComponentProps {
  value: BigNumber;
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
  amount: {
    flex: 'auto',
    padding: `${theme.spacing()}px`,
    border: 'none',
    textAlign: 'right',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none'
    }
  },
  max: {
    flex: '0 0 40px',
    cursor: 'pointer',
    margin: `0 ${theme.spacing(2)}px`,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  balance: {
    flex: '0 0 100px',
    textAlign: 'right',
    color: theme.palette.textDarker,
    marginRight: `${theme.spacing(2)}px`
  }
}));

export const ERC20TokenUsed : FC<ERC20TokenUsedProps> = props => {

  const {className, contract, value} = props;
  const classes = useStyles();
  const wallet = useWallet();

  const [token, setToken] = useState<ERC20TokenBalanceState>();

  useEffect(() => {
    let r: ERC20TokenBalanceState = {} as never;
    Promise.all([
      contract.getName().then(name => r.name = name),
      contract.getSymbol().then(symbol => r.symbol = symbol),
      contract.getIcon().then(icon => r.icon = icon),
      contract.getBalance(wallet.account).then(balance => r.balance = balance),
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
      <span className={classes.amount}>{Numbers.format(value)}</span>
      <span className={classes.balance}>{Numbers.format(token.balance.minus(value))}</span>
    </div>
  ) : <ERC20TokenLoading className={className}/>;
};