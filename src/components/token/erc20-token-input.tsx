import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {useWallet} from '../../context';
import {ERC20TokenLoading} from './erc20-token-loading';
import {ERC20TokenBalanceState, ERC20TokenComponentProps} from './token';
import {TokenHeader} from './token-header';

export interface ERC20TokenInputProps extends ERC20TokenComponentProps {
  value: BigNumber;
  onValueChanged: (value: BigNumber) => void;
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

export const ERC20TokenInput: FC<ERC20TokenInputProps> = props => {

  const {className, contract, disabled, value, onValueChanged} = props;
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

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (!token?.balance) {
      return;
    }
    let input = new BigNumber(e.target.value);
    input = input.isNaN() ? new BigNumber(0) : (input.gt(token.balance) ? token.balance : input);
    onValueChanged(input);
  };

  const onMaxClicked = () => {
    if (!token?.balance) {
      return;
    }
    !disabled && onValueChanged(new BigNumber(100));
  };

  return token ? (
    <div className={clsx(classes.root, className)}>
      <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
      <input className={classes.amount} type={'number'} disabled={disabled} onFocus={e => {e.target.select();}}
             value={value.toString()} onChange={onInputChanged}/>
      <span className={classes.max} onClick={onMaxClicked}>Max</span>
      <span className={classes.balance}>{Numbers.format(token.balance)}</span>
    </div>
  ): <ERC20TokenLoading className={className}/>;
};