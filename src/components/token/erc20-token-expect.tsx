import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {ERC20TokenLoading} from './erc20-token-loading';
import {ERC20TokenBalanceState, ERC20TokenComponentProps, ERC20TokenExpectState} from './token';
import {TokenHeader} from './token-header';

export interface ERC20TokenExpectProps extends ERC20TokenComponentProps {
  balance: BigNumber;
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
    textAlign: 'right',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none'
    }
  },
  spacer: {
    flex: '0 0 116px'
  }
}));

export const ERC20TokenExpect: FC<ERC20TokenExpectProps> = props => {

  const {className, contract, balance, value, onValueChanged} = props;
  const classes = useStyles();

  const [token, setToken] = useState<ERC20TokenExpectState>();

  useEffect(() => {
    let r: ERC20TokenBalanceState = {} as never;
    Promise.all([
      contract.getName().then(name => r.name = name),
      contract.getSymbol().then(symbol => r.symbol = symbol),
      contract.getIcon().then(icon => r.icon = icon),
    ]).then(() => {
      setToken({
        icon: r.icon,
        name: r.name,
        symbol: r.symbol
      });
    });
  }, [contract]);

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    let input = new BigNumber(e.target.value);
    input = input.isNaN() ? new BigNumber(0) : (input.gt(balance) ? value : input);
    onValueChanged(input);
  };

  return token ? (
    <div className={clsx(classes.root, className)}>
      <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol} />
      <span className={classes.label}>You want to get</span>
      <input className={classes.amount} type={'number'} onFocus={e => {e.target.select();}}
             value={value.toString()} onChange={onInputChanged}/>
      <span className={classes.spacer}/>
    </div>
  ): <ERC20TokenLoading className={className}/>;
};