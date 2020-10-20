import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ComponentProps} from '../CommonComponent';
import {MetaMaskAccount} from './MetaMaskAccount';

export interface AppBarProps extends ComponentProps {}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    position: 'relative',
    padding: `${theme.spacing(6)}px 0`
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px',
    textTransform: 'uppercase',
    color: theme.palette.textDarker,
    '& img': {
      height: '48px'
    }
  },
  account: {
    position: 'absolute',
    top: theme.spacing(6),
    right: theme.spacing(6)
  }
}));

export const AppBar: React.FC<AppBarProps> = (props) => {

  const {className} = props;
  const classes = useStyles();

  return (
    <header className={clsx(classes.root, className)}>
      <div className={classes.title}>
        <img src={'/assets/icon/honestswap.svg'} alt={'logo'}/>
        {/*<span>HonestSwap</span>*/}
      </div>
      <MetaMaskAccount className={classes.account}/>
    </header>
  );
};