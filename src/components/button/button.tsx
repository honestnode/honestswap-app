import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';

export interface ButtonProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    background: theme.palette.buttonPrimary,
    color: theme.palette.textWhite,
    border: `1px solid ${theme.palette.border}`,
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    cursor: 'pointer',
    borderRadius: '8px',
    '&:hover': {
      background: theme.palette.buttonPrimaryDarker
    },
    '&:focus': {
      outline: 0
    }
  }
}));

export const Button: React.FC<ButtonProps> = (props) => {

  const {label, disabled, onClick} = props;
  const classes = useStyles();

  return (
    <button className={classes.root} disabled={disabled} onClick={onClick}>{label}</button>
  );
};