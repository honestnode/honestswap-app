import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useCallback, useMemo} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
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

  const amounts = useMemo<Record<string, BigNumber>>(() => {
    return basket.tokens.reduce((r, t) => ({...r, [t.symbol]: amount.multipliedBy(t.ratio)}), {});
  }, [amount, basket]);

  useCallback(() => {
    onAmountsChanged(amounts);
  }, [amounts]);

  return (
    <div className={clsx(classes.root, className)}>
      {basket.tokens.map(token =>
        <ERC20TokenReceived className={classes.item} key={token.symbol} contract={token.contract}
                            amount={amounts[token.symbol]}/>
      )}
    </div>
  );
};