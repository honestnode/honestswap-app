import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
import {BasketTokenBalance} from '../../contract';
import {ComponentProps} from '../component-props';
import {ERC20TokenReceived} from '../token';

export interface BasketReceivedProps extends ComponentProps {
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

export const BasketReceived: FC<BasketReceivedProps> = props => {

  const {className, amount, onAmountsChanged} = props;
  const classes = useStyles();
  const basket = useBasket();

  const [balances, setBalances] = useState<Record<string, BasketTokenBalance>>({});

  React.useEffect(() => {
    basket.contract.getTokenBalances().then(balances => {
      setBalances(balances);
    });
  }, []);

  useEffect(() => {
    onAmountsChanged(Object.fromEntries(Object.entries(balances).map(([key, value]) => [key, amount.multipliedBy(value.ratio)])));
  }, [amount, balances]);

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.tokens).map(token =>
        <ERC20TokenReceived className={classes.item} key={token.symbol} contract={token.contract}
                            amount={amount.multipliedBy(balances[token.symbol]?.ratio || new BigNumber(0))}/>
      )}
    </div>
  );
};