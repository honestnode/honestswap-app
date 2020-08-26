import React from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';

export interface TokenInputProps {
  icon: string;
  name: string;
  balance: number;
  onValueChanged: (value: number) => void;
}

const useInputStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  max: {
    cursor: 'pointer',
    margin: `0 ${theme.spacing(2)}px`
  },
}));

export const TokenInput: React.FC<TokenInputProps> = (props) => {

  const {icon, name, balance, onValueChanged} = props;
  const classes = useInputStyles();
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    onValueChanged(Number(value || '0'));
  }, [value]);

  return (
    <div>
      <img src={icon} alt={'icon'} />
      <span>{name}</span>
      <input type={'number'} value={value} onChange={(e) => setValue(e.target.value)} />
      <span className={classes.max}>Max</span>
      <span>{Numbers.format(balance)}</span>
    </div>
  );
};