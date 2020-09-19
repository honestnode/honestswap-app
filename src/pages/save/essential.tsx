import BigNumber from 'bignumber.js';
import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {useContract, useSaving, useWallet} from '../../context';

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
  const wallet = useWallet();
  const saving = useSaving();

  const [weight, setWeight] = useState<BigNumber>(new BigNumber(0));
  const [apy, setApy] = useState<BigNumber>(new BigNumber(0));
  const [share, setShare] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    contract.saving.getApy().then(setApy);
    let weight: BigNumber = new BigNumber(0), totalWeight: BigNumber = new BigNumber(1);
    Promise.all([
      contract.weight.getWeight(wallet.account).then(w => weight = w),
      contract.weight.getTotalWeight().then(tw => totalWeight = tw)
    ]).then(() => {
      setWeight(weight);
      setShare(weight.dividedBy(totalWeight));
    });
  }, [wallet, contract]);

  return (
    <div className={classes.root}>
      <div className={classes.summary}>
        <div className={classes.column}>
          <p className={classes.leading}>Your hUSD Saving Balance</p>
          <p><span className={classes.number}>
              {Numbers.format(saving.balance, {thousandsSeparate: true})}
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
          <p className={classes.number}>{Numbers.format(share, {percentage: true, decimals: 8})}</p>
        </div>
      </div>
    </div>
  );
};
