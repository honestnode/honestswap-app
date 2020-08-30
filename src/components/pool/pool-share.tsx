import React from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useContract} from '../../context';
import {TokenShare} from '../token';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  title: {

  },
  item: {
    margin: `${theme.spacing(2)}px 0`,
    '&:last-child': {
      marginBottom: 0
    }
  }
}));

export const PoolShare: React.FC = () => {

  const contract = useContract();
  const theme = useTheme<HonestTheme>();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>hUSD Pool Share</div>
      {contract.tokens.map(token => <TokenShare key={token.name} className={classes.item} icon={token.icon} address={token.address}
                                                color={theme.palette.token(token.name.toLowerCase())} name={token.name}
                                                value={token.amount} share={token.share}/>)}
    </div>
  );
};