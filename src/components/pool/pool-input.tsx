import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useAccount, useContract} from '../../context';
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
  const account = useAccount();

  const accountBalances = contract.tokens.map(t => ({
    icon: t.icon,
    name: t.name,
    address: t.address,
    balance: account.balance(t.address)
  }));

  return (
    <div className={classes.root}>
      {accountBalances.map(t => <TokenSend key={t.name} className={classes.item}
                                           icon={t.icon} name={t.name} balance={t.balance}
                                           value={tokens[t.name] || new BigNumber(0)}
                                           onValueChanged={value => onTokenChanged(t.name, value)}/>)}
    </div>
  );
};