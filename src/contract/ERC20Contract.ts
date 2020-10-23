import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import {EthereumContract, EthereumContractInterface, EthereumContractProvider} from './EthereumContract';
import * as ERC20Artifact from '../artifacts/ERC20.json';
import {TransactionResponse} from '@ethersproject/abstract-provider';

export class ERC20Contract extends EthereumContract {

  private _name: string | undefined;
  private _symbol: string | undefined;
  private _decimals: number | undefined;

  constructor(address: string, provider: EthereumContractProvider, abi?: EthereumContractInterface) {
    super(address, abi || ERC20Artifact.abi, provider);
  }

  public getName(): Promise<string> {
    if (this._name !== undefined) {
      return Promise.resolve(this._name);
    }
    return this._handler.name();
  }

  public getSymbol(): Promise<string> {
    if (this._symbol !== undefined) {
      return Promise.resolve(this._symbol);
    }
    return this._handler.symbol();
  }

  public getDecimals(): Promise<number> {
    if (this._decimals !== undefined) {
      return Promise.resolve(this._decimals);
    }
    return this._handler.decimals();
  }

  public async getTotalSupply(): Promise<BigNumber> {
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.totalSupply();
    return result.then(n => new BigNumber(n.toString()).shiftedBy(-decimals));
  }

  public async getBalance(address: string): Promise<BigNumber>{
    const decimals = await this.getDecimals();
    const result: Promise<ethers.BigNumber> = this._handler.balanceOf(address);
    return result.then(n => new BigNumber(n.toString()).shiftedBy(-decimals));
  }

  public async approve(spender: string, amount: BigNumber): Promise<TransactionResponse> {
    return this._handler.approve(spender, ethers.BigNumber.from(amount.toString()));
  }

  public async allowanceOf(owner: string, spender: string): Promise<BigNumber> {
    const result: Promise<ethers.BigNumber> = this._handler.allowance(owner, spender);
    return result.then(n => new BigNumber(n.toString()));
  }
}