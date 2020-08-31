import BigNumber from 'bignumber.js';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {EthereumProviderRpcError} from '../common/types';
import {Connecting, Unexpected, Waiting} from '../pages/stage';
import {useEthereum} from './ethereum-provider';

export interface WalletContext {
  ready: boolean;
  account: string;
  getBalance: (token: string) => Promise<BigNumber>;
}

const walletContext = createContext<WalletContext>({ready: false} as never);

enum WalletStatus {
  NONE, PENDING, CONNECTING, CONNECTED
}

export const WalletProvider: React.FC = ({children}) => {

  const ethereum = useEthereum();
  const [status, setStatus] = useState<WalletStatus>(WalletStatus.NONE);
  const [context, setContext] = useState<WalletContext>();

  const onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setStatus(WalletStatus.PENDING);
    } else {
      setContext({
        ready: true,
        account: accounts[0],
        getBalance: token => ethereum.getBalance(accounts[0], token)
      });
      setStatus(WalletStatus.CONNECTED);
    }
  };

  const onConnect = async () => {
    setStatus(WalletStatus.CONNECTING);
    await ethereum.connectWallet().catch((_: EthereumProviderRpcError) => {
      setStatus(WalletStatus.PENDING);
    });
  };

  useEffect(() => {
    ethereum.getWallet().then(accounts => {
      onAccountsChanged(accounts);
      ethereum.onAccountsChanged(onAccountsChanged);
    });
    return () => {
      ethereum.offAccountsChanged(onAccountsChanged);
    };
  }, []);

  switch (status) {
    case WalletStatus.NONE:
      return null;
    case WalletStatus.PENDING:
      return <Waiting onConnect={onConnect}/>;
    case WalletStatus.CONNECTING:
      return <Connecting/>;
    case WalletStatus.CONNECTED:
      return context ? (
        <walletContext.Provider value={context}>{children}</walletContext.Provider>
      ) : <Unexpected/>;
    default:
      return <Unexpected/>;
  }
};

export const useWallet = () => useContext<WalletContext>(walletContext);