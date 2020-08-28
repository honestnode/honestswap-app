import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {MetaMaskAccount} from './metamask-account';

export interface AppBarProps {
  account?: string;
}

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
    color: theme.palette.textDarker
  },
  account: {
    position: 'absolute',
    top: theme.spacing(6),
    right: theme.spacing(6)
  }
}));

export const AppBar : React.FC<AppBarProps> = (props) => {

  const {account} = props;
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <div className={classes.title}>
        {/*<img src={''} alt={'logo'} />*/}
        <span>HonestSwap</span>
      </div>
      {account && (
        <div className={classes.account}>
          <MetaMaskAccount address={account} />
        </div>
      )}
    </header>
  );
};