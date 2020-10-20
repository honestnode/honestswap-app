import React, {createContext, FC, useContext, useEffect, useRef, useState} from 'react';
import {BasketAsset, BasketAssetBalance} from '../common';
import {HonestVaultContract} from '../contract';
import {LoadingStage} from '../pages/stage';
import {useContract} from './index';

export interface BasketContext {
  contract: HonestVaultContract;
  assets: BasketAsset[];
  findAsset: (symbol: string) => BasketAsset | undefined;
  balances: BasketAssetBalance[];
  findBalance: (symbol: string) => BasketAssetBalance | undefined;
}

const basketContext = createContext<BasketContext>({} as never);

export const BasketProvider: FC = ({children}) => {

  const [assets, setAssets] = useState<BasketAsset[]>();
  const [balances, setBalances] = useState<BasketAssetBalance[]>();
  const contract = useContract();
  const interval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    contract.honestConfiguration.getBasketAssets().then(assets => setAssets(Object.values(assets)));
    contract.honestVault.getBalances().then(setBalances);
    interval.current = setInterval(() => {
      contract.honestVault.getBalances().then(setBalances);
    }, 3000);
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [contract]);

  const findAsset = (symbol: string) => {
    return assets?.find(a => a.symbol === symbol);
  };

  const findBalance = (symbol: string) => {
    return balances?.find(a => a.symbol === symbol);
  };

  return (assets && balances) ? (
    <basketContext.Provider value={{
      contract: contract.honestVault,
      assets: assets,
      findAsset: findAsset,
      balances: balances,
      findBalance: findBalance,
    }}>{children}</basketContext.Provider>
  ) : <LoadingStage/>;
};

export const useBasket = () => useContext<BasketContext>(basketContext);