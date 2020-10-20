import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {useBasket} from '../../context';
import {ComponentProps} from '../CommonComponent';
import {ERC20TokenInput} from '../token';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  token: {
    position: 'relative',
    marginBottom: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginBottom: 0
    }
  },
  item: {},
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

export interface BasketInputProps extends ComponentProps {
  onValuesChanged: (value: Record<string, BigNumber>) => void;
  spender?: string;
}

export const BasketInput: FC<BasketInputProps> = props => {

  const {className, onValuesChanged, spender} = props;
  const classes = useStyles();
  const basket = useBasket();

  const [values, setValues] = useState<Record<string, BigNumber>>(
    basket.assets.reduce((m, t) => ({...m, [t.symbol]: new BigNumber(0)}), {})
  );
  const [bonuses] = useState<Record<string, boolean>>({});

  // useEffect(() => {
  //   const b:Record<string, boolean> = {};
  //   contract.fee.redeemFeeRate().then(v => {
  //     Promise.all(
  //       Object.values(basket.tokens).map(t => contract.bonus.hasBonus(t.contract.address, v).then(v => b[t.symbol] = v))
  //     ).then(() => {
  //       setBonuses(b);
  //     });
  //   });
  // }, [basket.tokens]);

  const onValueChanged = (symbol: string, value: BigNumber) => {
    const newValues = {...values, [symbol]: value};
    setValues(newValues);
    onValuesChanged(newValues);
  };

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.assets).map(token =>
        <div className={classes.token} key={token.symbol}>
          <ERC20TokenInput className={classes.item} token={token}
                           spender={spender} onValueChanged={(value) => onValueChanged(token.symbol, value)}/>
          {bonuses[token.symbol] && <span className={classes.bonus}>Bonus!</span>}
        </div>
      )}
    </div>
  );
};