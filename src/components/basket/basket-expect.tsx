import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
import {ComponentProps} from '../component-props';
import {ERC20TokenExpect} from '../token';

export interface BasketExpectProps extends ComponentProps {
  amount: BigNumber;
  onAmountsChanged: (amounts: Record<string, BigNumber>) => void;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  item: {
    marginBottom: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginBottom: 0
    }
  }
}));

export const BasketExpect: FC<BasketExpectProps> = props => {

  const {className, amount, onAmountsChanged} = props;
  const classes = useStyles();
  const basket = useBasket();

  const [balances, setBalances] = useState<Record<string, BigNumber>>({});

  const [amounts, setAmounts] = useState<Record<string, BigNumber>>(
    Object.values(basket.tokens).reduce((m, t) => ({...m, [t.symbol]: new BigNumber(0)}), {})
  );

  useEffect(() => {
    basket.contract.getTokenBalances().then(bs => {
      setBalances(Object.entries(bs).reduce((pv, [k, v]) => ({
        ...pv,
        [k]: v.balance
      }), {}))
    });
  }, []);

  const onValueChanged = (symbol: string, value: BigNumber) => {
    const updated = {...amounts, [symbol]: value};
    setAmounts(updated);
    onAmountsChanged(updated);
  };

  const balanceOf = (symbol: string) => {
    const balance = amount.minus(Object.entries(amounts).filter(([key, _]) => key !== symbol).reduce((r, [_, v]) => r.plus(v), new BigNumber(0)));
    const maxBalance = balances[symbol];
    return balance.gte(maxBalance) ? maxBalance: balance;
  };

  if (Object.entries(balances).length === 0) {
    return null;
  }

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.tokens).map(token =>
        <ERC20TokenExpect className={classes.item} key={token.symbol} balance={balanceOf(token.symbol)} value={amounts[token.symbol]}
                          onValueChanged={value => onValueChanged(token.symbol, value)} contract={token.contract}/>
      )}
    </div>
  );
};