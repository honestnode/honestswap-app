import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {ComponentProps} from '../component-props';

export interface ToggleButtonProps extends ComponentProps {
  label: string;
  checked?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  onCheckChanged: (value: boolean) => void;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    textAlign: 'center',
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
    cursor: 'pointer',
    border: `1px solid ${theme.palette.border}`,
    borderRadius: '8px',
    display: 'inline-block'
  },
  highlight: {
    background: theme.palette.buttonPrimary,
    color: theme.palette.textWhite
  },
  disabled: {
    background: theme.palette.buttonDisabled
  }
}));

export const ToggleButton: React.FC<ToggleButtonProps> = (props) => {

  const {className, label, checked = false, disabled, readonly = false, onCheckChanged} = props;
  const classes = useStyles();
  const [value, setValue] = React.useState<boolean>(checked);

  React.useEffect(() => {
    if (checked !== undefined) {
      setValue(checked);
    }
  }, [checked]);

  const onClick = () => {
    if (!readonly && !disabled) {
      let newValue = !value;
      setValue(newValue);
      onCheckChanged(newValue);
    }
  };

  return (
    <span className={clsx(classes.root, value && classes.highlight, disabled && classes.disabled, className)} onClick={onClick}>{label}</span>
  );
};