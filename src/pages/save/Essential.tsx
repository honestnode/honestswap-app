import BigNumber from 'bignumber.js';
import React, {useEffect, useRef, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {useContract, useEthereum} from '../../context';

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
    fontSize: '14px',
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
  const classes = useStyles();
  const contract = useContract();
  const ethereum = useEthereum();

  const interval = useRef<NodeJS.Timeout>();
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));
  const [apy] = useState<BigNumber>(new BigNumber(0));
  const [weight, setWeight] = useState<BigNumber>(new BigNumber(0));
  const [totalWeight, setTotalWeight] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    getBalance().then(setBalance);
    getWeight().then(setWeight);
    getTotalWeight().then(setTotalWeight);
    interval.current = setInterval(() => {
      getBalance().then(setBalance);
      getWeight().then(setWeight);
      getTotalWeight().then(setTotalWeight);
    }, 3000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [ethereum, contract]);

  const getBalance = async (): Promise<BigNumber> => {
    const share = await contract.honestVault.getShareOf(ethereum.account);
    const value = await contract.honestVault.getShareValue();
    return share.shiftedBy(-18).multipliedBy(value.shiftedBy(-18));
  };

  const getWeight = async (): Promise<BigNumber> => {
    const weight = await contract.honestVault.getWeightOf(ethereum.account);
    return weight.shiftedBy(-18);
  };

  const getTotalWeight = async (): Promise<BigNumber> => {
    const totalWeight = await contract.honestVault.getTotalWeight();
    return totalWeight.shiftedBy(-18);
  };

  return (
    <div className={classes.root}>
      <div className={classes.summary}>
        <div className={classes.column}>
          <p className={classes.leading}>Your hUSD Saving Balance</p>
          <p><span className={classes.number}>
              {Numbers.format(balance, {thousandsSeparate: true})}
            <span className={classes.unit}>hUSD</span></span></p>
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
          <p
            className={classes.number}>{Numbers.format(totalWeight.isZero() ? new BigNumber(0) : weight.dividedBy(totalWeight), {
            percentage: true,
            decimals: 8
          })}</p>
        </div>
      </div>
    </div>
  );
};
