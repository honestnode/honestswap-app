import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';

export interface MetaMaskAccountProps {
  address: string;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
    width: '24px',
    height: '24px'
  },
  address: {
    textDecoration: 'underline'
  }
}));

export const MetaMaskAccount: React.FC<MetaMaskAccountProps> = (props) => {

  const {address} = props;
  const classes = useStyles();

  const maskAddress = (address: string): string => {
    return address.replace(/^(.{6}).+(.{4})$/g, '$1....$2');
  }

  return (
    <span className={classes.root}>
      <img className={classes.icon} src={'/assets/icon/metamask-fox.svg'} alt={'MetaMask'} />
      <span className={classes.address}>{maskAddress(address)}</span>
    </span>
  );
};