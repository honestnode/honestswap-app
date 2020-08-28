import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  summary: {
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    '& p': {
      marginBottom: `${theme.spacing(2)}px`,
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  unit: {
    marginLeft: `${theme.spacing()}px`,
    color: theme.palette.textLighter
  },
  details: {
    display: 'flex'
  },
  column: {
    padding: `0 ${theme.spacing(4)}px`,
    '& p': {
      marginBottom: `${theme.spacing(2)}px`,
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  leading: {
    fontSize: '14px',
    color: theme.palette.textLighter
  },
  number: {
    color: theme.palette.textDarker
  }
}));

export const Essential: React.FC = () => {
  const {balance, weight, apy} = {
    balance: new BigNumber(1233.8892323),
    weight: new BigNumber(1400),
    apy: new BigNumber(0.222322)
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.summary}>
        <p className={classes.leading}>Your hUSD Saving Balance</p>
        <p><span className={classes.number}>{Numbers.format(balance, {thousandsSeparate: true})}<span className={classes.unit}>hUSD</span></span></p>
      </div>
      <div className={classes.details}>
        <div className={classes.column}>
          <p>Weight</p>
          <p className={classes.number}>{Numbers.format(weight)}</p>
        </div>
        <div className={classes.column}>
          <p>APY</p>
          <p className={classes.number}>{Numbers.format(apy, {percentage: true})}</p>
        </div>
      </div>
    </div>
  );
};
