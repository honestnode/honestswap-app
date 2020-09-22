import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket, useContract} from '../../context';
import {ComponentProps} from '../component-props';
import {ERC20TokenInput} from '../token';

export interface BasketInputProps extends ComponentProps {
  onValuesChanged: (value: Record<string, {amount: BigNumber, available: boolean}>) => void;
  spender?: string;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  token: {
    position: 'relative',
    marginBottom: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginBottom: 0
    }
  },
  item: {

  },
  bonus: {
    position: 'absolute',
    top: '16px',
    left: '-60px',
    display: 'block',
    width: '60px',
    fontFamily: 'fantasy',
    color: theme.palette.warning
  }
}));

export const BasketInput: FC<BasketInputProps> = props => {

  const {className, onValuesChanged, spender} = props;
  const classes = useStyles();
  const contract = useContract();
  const basket = useBasket();

  const [values, setValues] = useState<Record<string, {amount: BigNumber, available: boolean}>>(
    Object.values(basket.tokens).reduce((m, t) => ({...m, [t.symbol]: {amount: new BigNumber(0), available: true}}), {})
  );
  const [bonuses, setBonuses] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const b:Record<string, boolean> = {};
    contract.fee.redeemFeeRate().then(v => {
      Promise.all(
        Object.values(basket.tokens).map(t => contract.bonus.hasBonus(t.contract.address, v).then(v => b[t.symbol] = v))
      ).then(() => {
        setBonuses(b);
      });
    });
  }, [basket.tokens]);

  const onValueChanged = (symbol: string, value: BigNumber, available: boolean) => {
    const newValues = {...values, [symbol]: {amount: value, available: available}}
    setValues(newValues);
    onValuesChanged(newValues);
  };

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.tokens).map(token =>
        <div className={classes.token} key={token.symbol}>
          <ERC20TokenInput className={classes.item} contract={token.contract}
                           value={values[token.symbol].amount} spender={spender}
                           onValueChanged={(value, available) => onValueChanged(token.symbol, value, available)}/>
          {bonuses[token.symbol] && <span className={classes.bonus}>Bonus!</span>}
        </div>
      )}
    </div>
  );
};