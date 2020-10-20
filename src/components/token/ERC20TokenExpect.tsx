import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {ChangeEvent, FC} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ERC20TokenComponentProps} from './ERC20TokenComponent';
import {ERC20TokenLoading} from './ERC20TokenLoading';
import {TokenHeader} from './TokenHeader';

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

  const {className, token, balance, value, onValueChanged} = props;
  const classes = useStyles();

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    let input = new BigNumber(e.target.value);
    input = input.isNaN() ? new BigNumber(0) : (input.gt(balance) ? value : input);
    onValueChanged(input);
  };

  return token ? (
    <div className={clsx(classes.root, className)}>
      <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
      <span className={classes.label}>You want to get</span>
      <input className={classes.amount} type={'number'} onFocus={e => {e.target.select();}}
             value={value.toString()} onChange={onInputChanged}/>
      <span className={classes.spacer}/>
    </div>
  ) : <ERC20TokenLoading className={className}/>;
};