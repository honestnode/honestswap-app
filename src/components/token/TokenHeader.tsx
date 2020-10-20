import clsx from 'clsx';
import React, {FC} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ComponentProps} from '../CommonComponent';

export interface TokenHeaderProps extends ComponentProps {
  icon: string;
  name: string;
  symbol: string;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    width: '32px',
    height: '32px',
    marginRight: theme.spacing(2)
  },
  name: {},
  symbol: {
    flex: 'auto'
  }
}));

export const TokenHeader: FC<TokenHeaderProps> = props => {

  const {className, icon, symbol} = props;
  const classes = useStyles();

  return (
    <span className={clsx(classes.root, className)}>
      <img className={classes.icon} src={icon} alt={'icon'}/>
      {/*<span className={classes.name}>{name}</span>*/}
      <span className={classes.symbol}>{symbol}</span>
    </span>
  );
};