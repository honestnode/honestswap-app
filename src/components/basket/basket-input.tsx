import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
import {ComponentProps} from '../component-props';
import {ERC20TokenInput} from '../token';

export interface BasketInputProps extends ComponentProps {
  onTotalValueChanged: (value: BigNumber) => void;
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

  const {className, onTotalValueChanged} = props;
  const classes = useStyles();
  const basket = useBasket();

  const [values, setValues] = useState<Record<string, BigNumber>>(
    basket.tokens.reduce((m, t) => ({...m, [t.symbol]: new BigNumber(0)}), {})
  );

  useEffect(() => {
    if (Object.keys(values).length === 0) {
      onTotalValueChanged(new BigNumber(0));
    }
    onTotalValueChanged(Object.entries(values).map(([_, v]) => v).reduce((pv, cv) => pv.plus(cv)));
  }, [values]);

  const onValueChanged = (symbol: string, value: BigNumber) => {
    setValues({...values, [symbol]: value});
  };

  return (
    <div className={clsx(classes.root, className)}>
      {basket.tokens.map(token =>
        <ERC20TokenInput className={classes.item} key={token.symbol} contract={token.contract}
                         value={values[token.symbol]}
                         onValueChanged={value => onValueChanged(token.symbol, value)}/>
      )}
    </div>
  );
};