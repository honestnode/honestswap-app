import React, {createContext, FC, useContext, useMemo} from 'react';
import {
  VaultContract,
  HonestTokenContract,
  SavingContract,
  HonestTokenManagerContract,
  ERC20Contract, HonestBonusContract, HonestFeeContract
} from '../contract';
import {useEthereum} from './ethereum-provider';
import {useWallet} from './wallet-provider';

const hAssetAddress = '0x8DBBb2b8bD8820209614d89957d710F0B93016c8';
const hAssetManagerAddress = '0xB6e42332f2384ca71368026B95723AA9C46C66Ad';
const vaultAddress = '0x573C27e7751503Cf0C98aC62F7e05832e7f4bb8F';
const savingsAddress = '0xF9122714A405aba4B07E82CDC3a4c763A36DcF9b';
const bonusAddress = '0x829a05D84de1bECB5Ba97f354b4cF16a0BCFfAb2';
const feeAddress = '0xD8F7FA7416d49732A62C726FcA67969aD899C5F6';

export interface ContractContext {
  token: ERC20Contract;
  manager: HonestTokenManagerContract;
  vault: VaultContract;
  savings: SavingContract;
  bonus: HonestBonusContract;
  fee: HonestFeeContract;
}

const contractContext = createContext<ContractContext>({} as never);

export const ContractProvider: FC = ({children}) => {

  const ethereum = useEthereum();
  const wallet = useWallet();
  const context = useMemo<ContractContext>(() => {
    return {
      token: new HonestTokenContract(hAssetAddress, ethereum.provider),
      manager: new HonestTokenManagerContract(hAssetManagerAddress, ethereum.provider),
      vault: new VaultContract(vaultAddress, ethereum.provider),
      savings: new SavingContract(savingsAddress, ethereum.provider),
      bonus: new HonestBonusContract(bonusAddress, ethereum.provider),
      fee: new HonestFeeContract(feeAddress, ethereum.provider)
    };
  }, [ethereum, wallet]);

  return context ? (
    <contractContext.Provider value={context}>{children}</contractContext.Provider>
  ) : null;
};

export const useContract = () => useContext<ContractContext>(contractContext);