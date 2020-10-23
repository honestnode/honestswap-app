import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import * as HonestAssetManagerArtifact from '../artifacts/HonestAssetManager.json';
import {EthereumContract, EthereumContractProvider} from './EthereumContract';
import {TransactionResponse} from '@ethersproject/abstract-provider';

export class HonestAssetManagerContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, HonestAssetManagerArtifact.abi, provider);
  }

  public async estimateMintGas(amounts: Record<string, BigNumber>): Promise<BigNumber> {
    return this.estimateGas('mint',
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())));
  }

  public async estimateRedeemProportionallyGas(amount: BigNumber): Promise<BigNumber> {
    return this.estimateGas('redeemProportionally', ethers.BigNumber.from(amount.toString()));
  }

  public async estimateRedeemManuallyGas(amounts: Record<string, BigNumber>): Promise<BigNumber> {
    return this.estimateGas('redeemManually',
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())));
  }

  public async estimateSwapGas(fromToken: string, toToken: string, amount: BigNumber): Promise<BigNumber> {
    return this.estimateGas('swap',
      fromToken, toToken, ethers.BigNumber.from(amount.toString()));
  }

  public async estimateDepositGas(amount: BigNumber): Promise<BigNumber> {
    return this.estimateGas('deposit', ethers.BigNumber.from(amount.toString()));
  }

  public async estimateWithdrawGas(weight: BigNumber): Promise<BigNumber> {
    return this.estimateGas('withdraw', ethers.BigNumber.from(weight.toString()));
  }

  public async mint(amounts: Record<string, BigNumber>): Promise<TransactionResponse> {
    return this._handler.mint(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())));
  }

  public async redeemProportionally(amount: BigNumber): Promise<TransactionResponse> {
    return this._handler.redeemProportionally(ethers.BigNumber.from(amount.toString()));
  }

  public async redeemManually(amounts: Record<string, BigNumber>): Promise<TransactionResponse> {
    return this._handler.redeemManually(
      Object.keys(amounts), Object.values(amounts).map(a => ethers.BigNumber.from(a.toString())));
  }

  public async swap(fromToken: string, toToken: string, amount: BigNumber): Promise<TransactionResponse> {
    return this._handler.swap(
      fromToken, toToken, ethers.BigNumber.from(amount.toString()));
  }

  public async deposit(amount: BigNumber): Promise<TransactionResponse> {
    return this._handler.deposit(ethers.BigNumber.from(amount.toString()));
  }

  public async withdraw(weight: BigNumber): Promise<TransactionResponse> {
    return this._handler.withdraw(ethers.BigNumber.from(weight.toString()));
  }
}