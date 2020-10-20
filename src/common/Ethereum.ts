import {ethers} from 'ethers';

/*
 * 4001 User Rejected         Request	The user rejected the request.
 * 4100 Unauthorized          The requested method and/or account has not been authorized by the user.
 * 4200 Unsupported Method    The Provider does not support the requested method.
 * 4900 Disconnected          The Provider is disconnected from all chains.
 * 4901 Chain Disconnected    The Provider is not connected to the requested chain.
 */
export interface EthereumProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

export enum EthereumEvents {
  ACCOUNTS_CHANGED = 'accountsChanged',
  CHAIN_CHANGED = 'chainChanged'
}

export enum EthereumRequests {
  GET_ACCOUNTS = 'eth_accounts',
  GET_CHAIN = 'eth_chainId',
  CONNECT = 'eth_requestAccounts'
}

export interface EthereumProvider extends ethers.providers.ExternalProvider {
  on: (event: string, callback: (...args: any[]) => void ) => this;
  removeListener: (event: string, callback: (...args: any[]) => void ) => this;
}

declare global {
  interface Window {
    ethereum: EthereumProvider;
  }
}