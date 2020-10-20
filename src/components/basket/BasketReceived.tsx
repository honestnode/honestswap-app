import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useMemo} from 'react';
import {createUseStyles} from 'react-jss';
import {BasketAssetBalance} from '../../common';
import {HonestTheme} from '../../config';
import {useBasket} from '../../context';
import {ComponentProps} from '../CommonComponent';
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

  const balances = useMemo<Record<string, BasketAssetBalance>>(() => {
    return basket.balances.reduce((r, b) => ({...r, [b.symbol]: b}), {});
  }, [basket.balances]);
  //
  // const [balances, setBalances] = useState<Record<string, BasketAssetBalance>>({});
  //
  // React.useEffect(() => {
  //   basket.contract.getTokenBalances().then(balances => {
  //     setBalances(balances);
  //   });
  // }, []);

  useEffect(() => {
    onAmountsChanged(Object.fromEntries(Object.entries(balances).map(([key, value]) => [key, amount.multipliedBy(value.percentage)])));
  }, [amount, balances]);

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.assets).map(token =>
        <ERC20TokenReceived className={classes.item} key={token.symbol} token={token}
                            amount={amount.multipliedBy(balances[token.symbol]?.percentage || new BigNumber(0))}/>
      )}
    </div>
  );
};