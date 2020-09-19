import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
import {ComponentProps} from '../component-props';
import {ERC20TokenInput} from '../token';

export interface BasketInputProps extends ComponentProps {
  onValuesChanged: (value: Record<string, {amount: BigNumber, available: boolean}>) => void;
  spender?: string;
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

export const BasketInput: FC<BasketInputProps> = props => {

  const {className, onValuesChanged, spender} = props;
  const classes = useStyles();
  const basket = useBasket();

  const [values, setValues] = useState<Record<string, {amount: BigNumber, available: boolean}>>(
    Object.values(basket.tokens).reduce((m, t) => ({...m, [t.symbol]: {amount: new BigNumber(0), available: true}}), {})
  );

  const onValueChanged = (symbol: string, value: BigNumber, available: boolean) => {
    const newValues = {...values, [symbol]: {amount: value, available: available}}
    setValues(newValues);
    onValuesChanged(newValues);
  };

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.tokens).map(token =>
        <ERC20TokenInput className={classes.item} key={token.symbol} contract={token.contract}
                         value={values[token.symbol].amount} spender={spender}
                         onValueChanged={(value, available) => onValueChanged(token.symbol, value, available)}/>
      )}
    </div>
  );
};