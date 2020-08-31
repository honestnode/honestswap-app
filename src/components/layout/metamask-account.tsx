import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useWallet} from '../../context';
import {ComponentProps} from '../component-props';

export interface MetaMaskAccountProps extends ComponentProps {}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: `${theme.spacing(2)}px`,
    width: '24px',
    height: '24px'
  },
  address: {
    textDecoration: 'underline'
  },
  logout: {
    marginLeft: `${theme.spacing(2)}px`,
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  }
}));

export const MetaMaskAccount: React.FC<MetaMaskAccountProps> = (props) => {

  const {className} = props;
  const classes = useStyles();
  const wallet = useWallet();

  const maskAddress = (address: string): string => {
    return address.replace(/^(.{6}).+(.{4})$/g, '$1....$2');
  }

  return wallet.ready ? (
    <span className={clsx(classes.root, className)}>
      <img className={classes.icon} src={'/assets/icon/metamask-fox.svg'} alt={'MetaMask'} />
      <span className={classes.address}>{maskAddress(wallet.account)}</span>
      {/*<img className={classes.logout} src={'/assets/icon/logout.svg'} alt={'Log Out'} onClick={account.logout} />*/}
    </span>
  ): null;
};