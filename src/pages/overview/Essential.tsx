import BigNumber from 'bignumber.js';
import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {useBasket} from '../../context';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  section: {
    textAlign: 'center',
    padding: `${theme.spacing(4)}px ${theme.spacing(6)}px`,
    background: theme.palette.background
  },
  leading: {
    display: 'block',
    marginBottom: `${theme.spacing(4)}px`
  },
  value: {
    color: theme.palette.textDarker
  }
}));

export const Essential: React.FC = () => {


  const classes = useStyles();
  const [apy] = useState<BigNumber>(new BigNumber(0));

  const basket = useBasket();

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <span className={classes.leading}>Total hUSD supply</span>
        <span className={classes.value}>{Numbers.format(basket.totalBalance.shiftedBy(-18))}</span>
      </div>
      <div className={classes.section}>
        <span className={classes.leading}>APY</span>
        <span className={classes.value}>{Numbers.format(apy, {percentage: true})}</span>
      </div>
    </div>
  );
};
