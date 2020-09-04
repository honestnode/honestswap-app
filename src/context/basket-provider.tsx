import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {BasketToken} from '../contract';
import {Loading} from '../pages/stage';
import {useContract} from './index';

export interface BasketContext {
  tokens: BasketToken[]
}

const basketContext = createContext<BasketContext>({} as never);

export const BasketProvider: FC = ({children}) => {

  const [context, setContext] = useState<BasketContext>();
  const contract = useContract();

  useEffect(() => {
    contract.basket.getTokens().then(tokens => {
      setContext({tokens: tokens});
    });
  }, [contract]);

  return context ? (
    <basketContext.Provider value={context}>{children}</basketContext.Provider>
  ) : <Loading />;
};

export const useBasket = () => useContext<BasketContext>(basketContext);