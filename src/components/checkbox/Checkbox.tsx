import React, {ChangeEvent} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';

export interface CheckboxProps {
  label: string;
  onValueChanged: (v: boolean) => void;
  initialValue?: boolean;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginRight: `${theme.spacing(1)}px`
  },
  label: {}
}));

export const Checkbox: React.FC<CheckboxProps> = (props) => {

  const {label, onValueChanged, initialValue = false} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState<boolean>(initialValue);

  const onInputChanged = (_: ChangeEvent<HTMLInputElement>): void => {
    const changed = !value;
    setValue(changed);
    onValueChanged(changed);
  }

  return (
    <label className={classes.root}>
      <input className={classes.input} type={'checkbox'} checked={value} onChange={onInputChanged} /><span className={classes.label}>{label}</span>
    </label>
  );
};