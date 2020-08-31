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
    display: 'flex',
    padding: `${theme.spacing(8)}px 0 ${theme.spacing(6)}px`,
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
    display: 'flex',
    paddingBottom: `${theme.spacing(8)}px`
  },
  column: {
    marginRight: `${theme.spacing(10)}px`,
    '&:last-child': {
      marginRight: 0
    },
    '& p': {
      marginBottom: `${theme.spacing(2)}px`,
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  leading: {
    color: theme.palette.textLighter
  },
  number: {
    fontSize: '18px',
    color: theme.palette.textDarker
  }
}));

export const Essential: React.FC = () => {
  const {balance, weight, apy, share} = {
    balance: new BigNumber(1233.8892323),
    weight: new BigNumber(1400),
    apy: new BigNumber(0.222322),
    share: new BigNumber(0.0012)
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.summary}>
        <div className={classes.column}>
          <p className={classes.leading}>Your hUSD Saving Balance</p>
          <p><span className={classes.number}>{Numbers.format(balance, {thousandsSeparate: true})}<span className={classes.unit}>hUSD</span></span></p>
        </div>
        <div className={classes.column}>
          <p className={classes.leading}>APY</p>
          <p className={classes.number}>{Numbers.format(apy, {percentage: true})}</p>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.column}>
          <p className={classes.leading}>Weight</p>
          <p className={classes.number}>{Numbers.format(weight)}</p>
        </div>
        <div className={classes.column}>
          <p className={classes.leading}>My Share of Pool</p>
          <p className={classes.number}>{Numbers.format(share, {percentage: true, decimals: 8})}</p>
        </div>
      </div>
    </div>
  );
};
