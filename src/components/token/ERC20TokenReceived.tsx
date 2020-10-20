import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {ERC20TokenComponentProps} from './ERC20TokenComponent';
import {TokenHeader} from './TokenHeader';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    background: theme.palette.background,
    padding: `${theme.spacing()}px`
  },
  header: {
    flex: '0 0 120px'
  },
  label: {
    flex: 'auto',
    textAlign: 'right',
    marginRight: `${theme.spacing(2)}px`,
    color: theme.palette.textLighter
  },
  amount: {
    flex: '0 0 100px',
    width: '100px',
    padding: `${theme.spacing()}px`,
    border: 'none',
    textAlign: 'right'
  },
  spacer: {
    flex: '0 0 188px'
  }
}));

export interface ERC20TokenReceivedProps extends ERC20TokenComponentProps {
  amount: BigNumber;
}

export const ERC20TokenReceived: FC<ERC20TokenReceivedProps> = props => {

  const {className, token, amount} = props;
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
      <span className={classes.label}>You will get</span>
      <span className={classes.amount}>{Numbers.format(amount)}</span>
      <span className={classes.spacer}/>
    </div>
  );
};