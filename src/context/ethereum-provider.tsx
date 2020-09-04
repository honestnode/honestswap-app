import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {erc20ContractAbi} from '../common/contract';
import {EthereumEvents, EthereumRequests} from '../common/types';
import {Unsupported} from '../pages/stage';

export type AccountsChangedListener = (accounts: string[]) => void;

export interface EthereumContext {
  provider: ethers.providers.Web3Provider;
  getWallet: () => Promise<string[]>;
  connectWallet: () => Promise<string[]>;
  onAccountsChanged: (listener: AccountsChangedListener) => void;
  offAccountsChanged: (listener: AccountsChangedListener) => void;
  getNetwork: () => Promise<string>;
  getBalance: (address: string, token: string) => Promise<BigNumber>;
}

const ethereumContext = createContext<EthereumContext>({} as never);

interface ERC20Token {
  address: string;
  decimals: number;
  handler: ethers.Contract;
}

export const EthereumProvider: React.FC = ({children}) => {

  const provider = useRef<ethers.providers.Web3Provider>();
  const erc20Contracts = useRef<Record<string, ERC20Token>>({});
  const [context, setContext] = useState<EthereumContext>();

  const getWallet = async (): Promise<string[]> => {
    return window.ethereum.request?.({method: EthereumRequests.GET_ACCOUNTS}) as Promise<string[]>;
  };

  const connectWallet = async (): Promise<string[]> => {
    return window.ethereum.request?.({method: EthereumRequests.CONNECT}) as Promise<string[]>;
  };

  const onAccountsChanged = (listener: AccountsChangedListener) => {
    window.ethereum.on?.(EthereumEvents.ACCOUNTS_CHANGED, listener);
  };

  const offAccountsChanged = (listener: AccountsChangedListener) => {
    window.ethereum.removeListener?.(EthereumEvents.ACCOUNTS_CHANGED, listener);
  };

  const getNetwork = async (): Promise<string> => {
    if (provider.current) {
      return provider.current?.getNetwork().then(n => n.name);
    } else {
      return Promise.reject('Can not find any possible Web3Provider');
    }
  };

  const loadContract = async (token: string): Promise<ERC20Token> => {
    const handler = new ethers.Contract(token, erc20ContractAbi, provider.current);
    return handler.decimals().then((decimals: number) => ({
      address: token,
      decimals: decimals,
      handler: handler
    }));
  };

  const getBalance = async (address: string, token: string): Promise<BigNumber> => {
    if (!erc20Contracts.current[address]) {
      erc20Contracts.current[token] = await loadContract(token);
    }
    return (erc20Contracts.current[token].handler.balanceOf(address) as Promise<ethers.BigNumber>).then(n => new BigNumber(n.toString()).shiftedBy(-erc20Contracts.current[token].decimals));
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      provider.current = new ethers.providers.Web3Provider(window.ethereum);
      setContext({
        provider: provider.current,
        getWallet,
        connectWallet,
        onAccountsChanged,
        offAccountsChanged,
        getNetwork,
        getBalance
      });
    }
  }, []);

  return context ? (
    <ethereumContext.Provider value={context}>{children}</ethereumContext.Provider>
  ) : <Unsupported/>;
};

export const useEthereum = () => useContext<EthereumContext>(ethereumContext);