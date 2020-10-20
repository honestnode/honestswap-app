import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {useEthereum} from '../../context';
import {ERC20TokenComponentProps} from './ERC20TokenComponent';
import {ERC20TokenLoading} from './ERC20TokenLoading';
import {TokenHeader} from './TokenHeader';

export interface ERC20TokenUsedProps extends ERC20TokenComponentProps {
  value: BigNumber;
}

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
  amount: {
    flex: 'auto',
    padding: `${theme.spacing()}px`,
    border: 'none',
    textAlign: 'right',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none'
    }
  },
  max: {
    flex: '0 0 40px',
    cursor: 'pointer',
    margin: `0 ${theme.spacing(2)}px`,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  balance: {
    flex: '0 0 100px',
    textAlign: 'right',
    color: theme.palette.textDarker,
    marginRight: `${theme.spacing(2)}px`
  }
}));

export const ERC20TokenUsed: FC<ERC20TokenUsedProps> = props => {

  const {className, token, value} = props;
  const classes = useStyles();
  const ethereum = useEthereum();

  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    token.contract.getBalance(ethereum.account).then(setBalance);
  }, [token, ethereum]);

  return token ? (
    <div className={clsx(classes.root, className)}>
      <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
      <span className={classes.amount}>{Numbers.format(value)}</span>
      <span className={classes.balance}>{Numbers.format(balance.minus(value))}</span>
    </div>
  ) : <ERC20TokenLoading className={className}/>;
};