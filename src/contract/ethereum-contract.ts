import {ContractInterface} from '@ethersproject/contracts';
import {ethers} from 'ethers';

export type EthereumContractProvider = ethers.providers.Web3Provider;
export type EthereumContractInterface = ContractInterface;

export abstract class EthereumContract {

  protected _address: string;
  protected _provider: EthereumContractProvider;
  protected _abi: EthereumContractInterface;
  protected _handler: ethers.Contract;

  protected constructor(address: string, abi: EthereumContractInterface, provider: EthereumContractProvider) {
    this._address = address;
    this._provider = provider;
    this._abi = abi;
    this._handler = new ethers.Contract(address, abi, provider.getSigner());
  }

  public get address(): string {
    return this._address;
  }
}