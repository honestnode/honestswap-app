import React, {createContext, FC, useContext, useEffect, useState} from 'react';
import {HonestAsset} from '../common';
import {HonestAssetManagerContract, HonestConfigurationContract, HonestVaultContract} from '../contract';
import {LoadingStage, UnexpectedStage} from '../pages/stage';
import {useEthereum} from './EthereumProvider';

declare const ENV_CONFIGURATION_CONTRACT: string;
declare const ENV_ASSET_MANAGER_CONTRACT: string;
declare const ENV_VAULT_CONTRACT: string;

const contracts = {
  honestConfiguration: ENV_CONFIGURATION_CONTRACT,
  honestAssetManager: ENV_ASSET_MANAGER_CONTRACT,
  honestVault: ENV_VAULT_CONTRACT
};

export interface ContractContextProps {
  honestConfiguration: HonestConfigurationContract;
  honestAsset: HonestAsset;
  honestAssetManager: HonestAssetManagerContract;
  honestVault: HonestVaultContract;
}

const ContractContext = createContext<ContractContextProps>({} as never);

export const ContractProvider: FC = ({children}) => {

  const ethereum = useEthereum();

  if (!contracts.honestConfiguration || !contracts.honestAssetManager || !contracts.honestVault) {
    return <UnexpectedStage />;
  }

  const honestConfiguration = new HonestConfigurationContract(contracts.honestConfiguration, ethereum.provider);
  const honestAssetManager = new HonestAssetManagerContract(contracts.honestAssetManager, ethereum.provider);
  const honestVault = new HonestVaultContract(contracts.honestVault, ethereum.provider);

  const [honestAsset, setHonestAsset] = useState<HonestAsset>();

  useEffect(() => {
    honestConfiguration.getHonestAsset().then(setHonestAsset);
  }, [ethereum]);

  return (honestAsset) ? (
    <ContractContext.Provider value={{
      honestConfiguration, honestAsset, honestAssetManager, honestVault
    }}>{children}</ContractContext.Provider>
  ) : <LoadingStage/>;
};

export const useContract = () => useContext<ContractContextProps>(ContractContext);