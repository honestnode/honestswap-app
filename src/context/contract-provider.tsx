import React, {createContext, FC, useContext, useMemo} from 'react';
import {BasketContract, HTokenContract, SavingContract, SwapContract, WeightContract} from '../contract';
import {useEthereum} from './ethereum-provider';
import {useWallet} from './wallet-provider';

// const basketAddress = '0x7AE685713D0dcccccE3D936D3E0FA382639839Df';
const basketAddress = '0xDaA9759F1F588D72f871a267d57f267A0BFbe546';
// const hAssetAddress = '0x24a8cfe26871f83cb39adca1028caed97d6a7ed3';
const hAssetAddress = '0x0Cf971aC8bb4abA48640Af445950A20411Fc64f2';

const savingAddress = '0x23a1D14502cd92f1429d86f66455dA9024e9c36E';
const swapAddress = '0xDaA9759F1F588D72f871a267d57f267A0BFbe546';
const weightAddress = '0xDaA9759F1F588D72f871a267d57f267A0BFbe546';

export interface ContractContext {
  hToken: HTokenContract;
  basket: BasketContract;
  saving: SavingContract;
  swap: SwapContract;
  weight: WeightContract;
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
      swap: new SwapContract(swapAddress, ethereum.provider),
      weight: new WeightContract(weightAddress, ethereum.provider)
    };
  }, [ethereum, wallet]);

  return context ? (
    <contractContext.Provider value={context}>{children}</contractContext.Provider>
  ) : null;
};

export const useContract = () => useContext<ContractContext>(contractContext);