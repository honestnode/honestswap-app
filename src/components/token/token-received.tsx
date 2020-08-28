import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {ChangeEvent} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {ComponentProps} from '../component-props';
import {TokenProps} from './token-props';

export interface TokenReceivedProps extends TokenProps, ComponentProps {
  amount?: BigNumber;
  maxAmount?: BigNumber;
  readonly?: boolean;
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
    flex: '0 0 188px'
  }
}));

export const TokenReceived: React.FC<TokenReceivedProps> = (props) => {
  const {className, icon, name, amount = new BigNumber(0), maxAmount, readonly, onValueChanged} = props;
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

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>): void => {
    let input = new BigNumber(e.target.value) || new BigNumber(0);
    if (maxAmount !== undefined && input > maxAmount) {
      input = maxAmount;
    }
    setValue(input);
    onValueChanged && onValueChanged(input);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <img className={classes.icon} src={icon} alt={'icon'}/>
      <span className={classes.name}>{name}</span>
      <span className={classes.label}>You will get</span>
      <input className={classes.amount} disabled={readonly} type={'number'} onFocus={e => {e.target.select();}}
             value={value.toString()} onChange={onInputChanged}/>
      <span className={classes.spacer}/>
    </div>
  );
};