import React, {createContext, FC, useContext, useMemo} from 'react';
import {BasketContract, HTokenContract} from '../contract';
import {useEthereum} from './ethereum-provider';
import {useWallet} from './wallet-provider';

// const basketAddress = '0x7AE685713D0dcccccE3D936D3E0FA382639839Df';
const basketAddress = '0x66126B4aA2a1C07536Ef8E5e8bD4EfDA1FdEA96D';
// const hAssetAddress = '0x24a8cfe26871f83cb39adca1028caed97d6a7ed3';
const hAssetAddress = '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5';

export interface ContractContext {
  hToken: HTokenContract;
  basket: BasketContract;
}

const contractContext = createContext<ContractContext>({} as never);

export const ContractProvider: FC = ({children}) => {

  const ethereum = useEthereum();
  const wallet = useWallet();
  const context = useMemo<ContractContext>(() => {
    return {
      hToken: new HTokenContract(hAssetAddress, ethereum.provider),
      basket: new BasketContract(basketAddress, ethereum.provider)
    };
  }, [ethereum, wallet]);

  return context ? (
    <contractContext.Provider value={context}>{children}</contractContext.Provider>
  ) : null;
};

export const useContract = () => useContext<ContractContext>(contractContext);