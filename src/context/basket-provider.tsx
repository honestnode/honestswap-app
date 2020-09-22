import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {VaultContract, BasketToken} from '../contract';
import {Loading} from '../pages/stage';
import {useContract} from './index';

export interface BasketContext {
  contract: VaultContract;
  tokens: Record<string, BasketToken>;
}

const basketContext = createContext<BasketContext>({} as never);

export const BasketProvider: FC = ({children}) => {

  const [context, setContext] = useState<BasketContext>();
  const contract = useContract();

  useEffect(() => {
    contract.vault.getTokens().then(tokens => {
      setContext({
        contract: contract.vault,
        tokens: tokens,
      });
    });
  }, [contract]);

  return context ? (
    <basketContext.Provider value={context}>{children}</basketContext.Provider>
  ) : <Loading />;
};

export const useBasket = () => useContext<BasketContext>(basketContext);