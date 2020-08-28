import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useAccount, useContract} from '../../context';
import {TokenBalance, TokenSend} from '../token';

export interface PoolInputProps {
  onTokenInputChanged: (name: string, value: BigNumber) => void;
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

  const {onTokenInputChanged} = props;
  const classes = useStyles();

  const contract = useContract();
  const account = useAccount();
  const accountBalances = React.useMemo<TokenBalance[]>(() => {
    if (!contract || !account) {
      return [];
    }
    return contract.tokens.map(t => ({
      icon: t.icon,
      name: t.name,
      address: t.address,
      balance: account.balance(t.address)
    }));
  }, [contract, account]);

  return (
    <div className={classes.root}>
      {accountBalances.map(t => <TokenSend key={t.name} className={classes.item}
                                           icon={t.icon} name={t.name} balance={t.balance}
                                           onValueChanged={value => onTokenInputChanged(t.name, value)}/>)}
    </div>
  );
};