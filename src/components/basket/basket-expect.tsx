import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
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

  const [amounts, setAmounts] = useState<Record<string, BigNumber>>(
    basket.tokens.reduce((m, t) => ({...m, [t.symbol]: new BigNumber(0)}), {})
  );

  const onValueChanged = (symbol: string, value: BigNumber) => {
    const updated = {...amounts, [symbol]: value};
    setAmounts(updated);
    onAmountsChanged(updated);
  };

  const balance = (symbol: string): BigNumber => {
    return amount.minus(Object.entries(amounts).filter(([key, _]) => key !== symbol).reduce((r, [_, v]) => r.plus(v), new BigNumber(0)));
  };

  return (
    <div className={clsx(classes.root, className)}>
      {basket.tokens.map(token =>
        <ERC20TokenExpect className={classes.item} key={token.symbol} balance={balance(token.symbol)} value={amounts[token.symbol]}
                          onValueChanged={value => onValueChanged(token.symbol, value)} contract={token.contract}/>
      )}
    </div>
  );
};