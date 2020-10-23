import {ethers} from 'ethers';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {EthereumEvents, EthereumProviderRpcError, EthereumRequests} from '../common';
import {ConnectingStage, UnavailableStage, UnsupportedStage, WaitingStage} from '../pages/stage';

declare const ENV_NETWORK: number;

export enum ProviderState {
  UNAVAILABLE,PENDING, CONNECTING, CONNECTED, UNSUPPORTED
}

export interface EthereumContextProps {
  state: ProviderState;
  provider: ethers.providers.Web3Provider;
  chainId: number;
  account: string;
  version: number;
  refresh: () => void;
}

const EthereumContext = createContext<EthereumContextProps>({} as never);

export const EthereumProvider: React.FC = ({children}) => {

  const [state, setState] = useState<ProviderState>();
  const [account, setAccount] = useState<string>('');
  const [chainId, setChainId] = useState<number>(-1);
  const [version, setVersion] = useState<number>(0);

  if (!(window.ethereum && window.ethereum.isMetaMask)) {
    return <UnavailableStage/>;
  }

  const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

  const getChain = async (): Promise<number> => {
    const chainId = await (window.ethereum.request?.({method: EthereumRequests.GET_CHAIN}) as Promise<string>);
    return Number.parseInt(chainId, 16);
  };

  const getWallet = async (): Promise<string[]> => {
    return window.ethereum.request?.({method: EthereumRequests.GET_ACCOUNTS}) as Promise<string[]>;
  };

  const connectWallet = async (): Promise<string[]> => {
    return window.ethereum.request?.({method: EthereumRequests.CONNECT}) as Promise<string[]>;
  };

  const onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setState(ProviderState.PENDING);
    } else {
      setAccount(accounts[0]);
    }
  };

  const onChainChanged = (chainId: number) => {
    if (ENV_NETWORK === -1 || (ENV_NETWORK !== -1 && ENV_NETWORK === chainId)) {
      setChainId(chainId);
      setState(ProviderState.CONNECTED);
    } else {
      setState(ProviderState.UNSUPPORTED);
    }
  };

  const onConnect = async () => {
    setState(ProviderState.CONNECTING);
    await connectWallet().catch((_: EthereumProviderRpcError) => {
      setState(ProviderState.PENDING);
    });
  };

  const refresh = () => {
    setVersion(version => version + 1);
  };

  useEffect(() => {
    getWallet().then(accounts => {
      onAccountsChanged(accounts);
      window.ethereum.on?.(EthereumEvents.ACCOUNTS_CHANGED, onAccountsChanged);
      window.ethereum.on?.(EthereumEvents.CHAIN_CHANGED, onChainChanged);
    });
    return () => {
      window.ethereum.removeListener?.(EthereumEvents.ACCOUNTS_CHANGED, onAccountsChanged);
      window.ethereum.removeListener?.(EthereumEvents.CHAIN_CHANGED, onChainChanged);
    };
  }, []);

  useEffect(() => {
    if (account) {
      getChain().then(onChainChanged);
    }
  }, [account]);

  switch (state) {
    case ProviderState.PENDING:
      return <WaitingStage onConnect={onConnect}/>;
    case ProviderState.CONNECTING:
      return <ConnectingStage/>;
    case ProviderState.CONNECTED:
      return <EthereumContext.Provider value={{
        version: version,
        state: state,
        provider: provider,
        account: account,
        chainId: chainId,
        refresh
      }}>{children}</EthereumContext.Provider>;
    case ProviderState.UNSUPPORTED:
      return <UnsupportedStage />;
    default:
      return null;
  }
};

export const useEthereum = () => useContext<EthereumContextProps>(EthereumContext);