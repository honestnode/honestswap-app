import {TransactionReceipt} from '@ethersproject/abstract-provider';
import {ContractInterface} from '@ethersproject/contracts';
import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';

export type Address = string;

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

  public async estimateGas(method: string, ...args: Array<any>): Promise<BigNumber> {
    const price = await this._provider.getGasPrice();
    const result: Promise<ethers.BigNumber> = this._handler.estimateGas[method](...args);
    return result.then(a => new BigNumber(a.mul(price).toString()).shiftedBy(-18));
  }

  public async waitForConfirmation(tx: string): Promise<TransactionReceipt> {
    return this._provider.waitForTransaction(tx, 1);
  }
}