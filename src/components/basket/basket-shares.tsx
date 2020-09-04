import React, {FC} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
import {ERC20TokenShare} from '../token';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  title: {},
  item: {
    margin: `${theme.spacing(2)}px 0`,
    '&:last-child': {
      marginBottom: 0
    }
  }
}));

export const BasketShares: FC = () => {

  const classes = useStyles();
  const basket = useBasket();

  return (
    <div className={classes.root}>
      <div className={classes.title}>hUSD Pool Share</div>
      {basket.tokens.map(token =>
        <ERC20TokenShare className={classes.item} key={token.symbol} contract={token.contract} amount={token.balance}
                         share={token.ratio}/>
      )}
    </div>
  );
};