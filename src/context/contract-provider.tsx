import React, {createContext, FC, useContext, useMemo} from 'react';
import {BasketContract, HTokenContract, SavingContract, SwapContract} from '../contract';
import {useEthereum} from './ethereum-provider';
import {useWallet} from './wallet-provider';

// const basketAddress = '0x7AE685713D0dcccccE3D936D3E0FA382639839Df';
const basketAddress = '0x40F40E4A95bB031f2C888B3eb3a111D2D42AB1D9';
// const hAssetAddress = '0x24a8cfe26871f83cb39adca1028caed97d6a7ed3';
const hAssetAddress = '0x3592807834Ad53fe2c0925Ea1a25d9d275C370D2';

const savingAddress = '0x584c250D1AF1a655E1556400968c9C3Aef5F25d8';
const swapAddress = '0x6423F97552018FDDf7Bf20bE6D016d9De65Af46F';

export interface ContractContext {
  hToken: HTokenContract;
  basket: BasketContract;
  saving: SavingContract;
  swap: SwapContract;
}

const contractContext = createContext<ContractContext>({} as never);

export const ContractProvider: FC = ({children}) => {

  const ethereum = useEthereum();
  const wallet = useWallet();
  const context = useMemo<ContractContext>(() => {
    return {
      hToken: new HTokenContract(hAssetAddress, ethereum.provider),
      basket: new BasketContract(basketAddress, ethereum.provider),
      saving: new SavingContract(savingAddress, ethereum.provider),
      swap: new SwapContract(swapAddress, ethereum.provider)
    };
  }, [ethereum, wallet]);

  return context ? (
    <contractContext.Provider value={context}>{children}</contractContext.Provider>
  ) : null;
};

export const useContract = () => useContext<ContractContext>(contractContext);