import React, {createContext, FC, useContext, useMemo} from 'react';
import {BasketContract, HTokenContract, SavingContract} from '../contract';
import {useEthereum} from './ethereum-provider';
import {useWallet} from './wallet-provider';

// const basketAddress = '0x7AE685713D0dcccccE3D936D3E0FA382639839Df';
const basketAddress = '0x66126B4aA2a1C07536Ef8E5e8bD4EfDA1FdEA96D';
// const hAssetAddress = '0x24a8cfe26871f83cb39adca1028caed97d6a7ed3';
const hAssetAddress = '0xe2f2a5C287993345a840Db3B0845fbC70f5935a5';

const savingAddress = '0xcf3f73290803fc04425bee135a4caeb2bab2c2a1';

export interface ContractContext {
  hToken: HTokenContract;
  basket: BasketContract;
  saving: SavingContract;
}

const contractContext = createContext<ContractContext>({} as never);

export const ContractProvider: FC = ({children}) => {

  const ethereum = useEthereum();
  const wallet = useWallet();
  const context = useMemo<ContractContext>(() => {
    return {
      hToken: new HTokenContract(hAssetAddress, ethereum.provider),
      basket: new BasketContract(basketAddress, ethereum.provider),
      saving: new SavingContract(savingAddress, ethereum.provider)
    };
  }, [ethereum, wallet]);

  return context ? (
    <contractContext.Provider value={context}>{children}</contractContext.Provider>
  ) : null;
};

export const useContract = () => useContext<ContractContext>(contractContext);