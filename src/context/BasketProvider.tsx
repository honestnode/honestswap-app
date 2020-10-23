import BigNumber from 'bignumber.js';
import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {BasketAsset, BasketAssetBalance} from '../common';
import {HonestVaultContract} from '../contract';
import {LoadingStage} from '../pages/stage';
import {useContract} from './index';

export interface BasketContext {
  contract: HonestVaultContract;
  assets: BasketAsset[];
  findAsset: (expect: Partial<BasketAsset>) => BasketAsset | undefined;
  balances: BasketAssetBalance[];
  totalBalance: BigNumber;
  findBalance: (symbol: string) => BasketAssetBalance | undefined;
}

const basketContext = createContext<BasketContext>({} as never);

export const BasketProvider: FC = ({children}) => {

  const [assets, setAssets] = useState<BasketAsset[]>();
  const [balances, setBalances] = useState<BasketAssetBalance[]>();
  const [totalBalance, setTotalBalance] = useState<BigNumber>(new BigNumber(0));
  const contract = useContract();

  useEffect(() => {
    contract.honestConfiguration.getBasketAssets().then(assets => setAssets(Object.values(assets)));
    getBalances();
  }, [contract]);

  const getBalances = async (): Promise<void> => {
    return await contract.honestVault.getBalances().then(({balances, totalBalance}) => {
      setBalances(balances);
      setTotalBalance(totalBalance);
    });
  };

  const predicateAsset = (target: BasketAsset, expect: Partial<BasketAsset>): boolean => {
    for (const key of Object.keys(expect)) {
      // @ts-ignore
      if (target[key] !== expect[key]) {
        return false;
      }
    }
    return true;
  };

  const findAsset = (expect: Partial<BasketAsset>): BasketAsset | undefined => {
    return assets?.find(a => predicateAsset(a, expect));
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
      totalBalance: totalBalance,
      findBalance: findBalance
    }}>{children}</basketContext.Provider>
  ) : <LoadingStage/>;
};

export const useBasket = () => useContext<BasketContext>(basketContext);