import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {ChangeEvent} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {ComponentProps} from '../component-props';
import {TokenProps} from './token-props';

export interface TokenBalance extends TokenProps {
  amount?: BigNumber;
  balance: BigNumber;
  readonly?: boolean;
}

export interface TokenSendProps extends TokenBalance, ComponentProps {
  onValueChanged?: (value: BigNumber) => void;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    background: theme.palette.background,
    padding: `${theme.spacing()}px`
  },
  icon: {
    width: '32px',
    height: '32px',
    marginRight: theme.spacing()
  },
  name: {
    flex: '0 0 60px'
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

export const TokenSend: React.FC<TokenSendProps> = (props) => {

  const {className, icon, name, amount = new BigNumber(0), balance, readonly = false, onValueChanged} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState<BigNumber>(amount);

  React.useEffect(() => {
    if (readonly) {
      setValue(amount);
    }
  }, [amount]);

  React.useEffect(() => {
    if (!readonly) {
      setValue(new BigNumber(0));
    }
  }, [readonly]);

  const onInputValueChanged = (input: BigNumber) => {
    setValue(input);
    onValueChanged && onValueChanged(input);
  };

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    let input = new BigNumber(e.target.value) || new BigNumber(0);
    input = input > balance ? balance : input;
    onInputValueChanged(input);
  };

  const onMaxClicked = (): void => {
    !readonly && onInputValueChanged(balance);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <img className={classes.icon} src={icon} alt={'icon'}/>
      <span className={classes.name}>{name}</span>
      <input className={classes.amount} type={'number'} disabled={readonly} onFocus={e => {e.target.select();}}
             value={value.toString()} onChange={onInputChanged}/>
      <span className={classes.max} onClick={onMaxClicked}>Max</span>
      <span className={classes.balance}>{Numbers.format(balance)}</span>
    </div>
  );
};