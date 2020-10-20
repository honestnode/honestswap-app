import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useMemo, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {BasketAssetBalance} from '../../common';
import {HonestTheme} from '../../config';
import {useBasket} from '../../context';
import {ComponentProps} from '../CommonComponent';
import {ERC20TokenExpect} from '../token';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  item: {
    marginBottom: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginBottom: 0
    }
  }
}));

export interface BasketExpectProps extends ComponentProps {
  amount: BigNumber;
  onAmountsChanged: (amounts: Record<string, BigNumber>) => void;
}

export const BasketExpect: FC<BasketExpectProps> = props => {

  const {className, amount, onAmountsChanged} = props;
  const classes = useStyles();
  const basket = useBasket();

  const balances = useMemo<Record<string, BasketAssetBalance>>(() => {
    return basket.balances.reduce((r, b) => ({...r, [b.symbol]: b}), {});
  }, [basket.balances]);

  const [amounts, setAmounts] = useState<Record<string, BigNumber>>(
    basket.assets.reduce((m, t) => ({...m, [t.symbol]: new BigNumber(0)}), {})
  );

  const onValueChanged = (symbol: string, value: BigNumber) => {
    const updated = {...amounts, [symbol]: value};
    setAmounts(updated);
    onAmountsChanged(updated);
  };

  const balanceOf = (symbol: string): BigNumber => {
    const balance = amount.minus(Object.entries(amounts).filter(([key, _]) => key !== symbol).reduce((r, [_, v]) => r.plus(v), new BigNumber(0)));
    const maxBalance = balances[symbol].balance;
    return balance.gte(maxBalance) ? maxBalance : balance;
  };

  if (Object.entries(balances).length === 0) {
    return null;
  }

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.assets).map(token =>
        <ERC20TokenExpect className={classes.item} key={token.symbol} balance={balanceOf(token.symbol)}
                          value={amounts[token.symbol]}
                          onValueChanged={value => onValueChanged(token.symbol, value)} token={token}/>
      )}
    </div>
  );
};