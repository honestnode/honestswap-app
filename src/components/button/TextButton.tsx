import clsx from 'clsx';
import React, {FC} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ComponentProps} from '../CommonComponent';

export interface TextButtonProps extends ComponentProps {
  onClicked?: () => void;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    color: theme.palette.buttonPrimary,
    fontSize: theme.typography.buttonFontSize,
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.buttonPrimaryDarker
    }
  }
}));

export const TextButton : FC<TextButtonProps> = (props) => {

  const {className, children, onClicked} = props;
  const classes = useStyles();

  return (
    <span className={clsx(classes.root, className)} onClick={onClicked}>{children}</span>
  );
}