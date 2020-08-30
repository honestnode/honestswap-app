import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useContract} from '../../context';
import {TokenSend} from '../token';

export interface PoolInputProps {
  tokens: Record<string, BigNumber>;
  onTokenChanged: (name: string, value: BigNumber) => void;
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

export const PoolInput: React.FC<PoolInputProps> = (props) => {

  const {tokens, onTokenChanged} = props;
  const classes = useStyles();

  const contract = useContract();

  return (
    <div className={classes.root}>
      {contract.tokens.map(t => <TokenSend key={t.name} className={classes.item}
                                           icon={t.icon} name={t.name} address={t.address}
                                           value={tokens[t.name] || new BigNumber(0)}
                                           onValueChanged={value => onTokenChanged(t.name, value)}/>)}
    </div>
  );
};