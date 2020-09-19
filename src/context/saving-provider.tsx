import BigNumber from 'bignumber.js';
import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {useContract} from './contract-provider';
import {useWallet} from './wallet-provider';

export interface SavingContext {
  balance: BigNumber;
}

const savingContext = createContext<SavingContext>({} as never);

export const SavingProvider : FC = ({children}) => {

  const [context, setContext] = useState<SavingContext>({
    balance: new BigNumber(0)
  });
  const wallet = useWallet();
  const contract = useContract();

  useEffect(() => {
    contract.saving.getTotalBalance().then(balance => {
      setContext({
        ...context,
        balance: balance
      })
    });
  }, [wallet, contract]);

  return (
    <savingContext.Provider value={context}>{children}</savingContext.Provider>
  );
};

export const useSaving = () => useContext<SavingContext>(savingContext);