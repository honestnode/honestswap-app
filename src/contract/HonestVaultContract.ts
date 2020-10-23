import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import * as HonestVaultArtifact from '../artifacts/HonestVault.json';
import {BasketAssetBalance, initializeBasketAsset} from '../common';
import {ERC20Contract} from './ERC20Contract';
import {EthereumContract, EthereumContractProvider} from './EthereumContract';

export class HonestVaultContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, HonestVaultArtifact.abi, provider);
  }

  public async getBalances(): Promise<{balances: BasketAssetBalance[], totalBalance: BigNumber}> {
    const [assets, balances, totalBalance]: [string[], ethers.BigNumber[], ethers.BigNumber] = await this._handler.balances();
    const result: BasketAssetBalance[] = [];
    for (let i = 0; i < assets.length; ++i) {
      const asset = await initializeBasketAsset(new ERC20Contract(assets[i], this._provider));
      result.push({
        balance: new BigNumber(balances[i].toString()).shiftedBy(-18),
        percentage: totalBalance.isZero() ? new BigNumber(0) : new BigNumber(balances[i].toString()).dividedBy(new BigNumber(totalBalance.toString())),
        ...asset
      });
    }
    return {balances: result, totalBalance: new BigNumber(totalBalance.toString())};
  }

  public async getWeightOf(account: string): Promise<BigNumber> {
    const value: ethers.BigNumber = await this._handler.weightOf(account);
    return new BigNumber(value.toString());
  }

  public async getTotalWeight(): Promise<BigNumber> {
    const value: ethers.BigNumber = await this._handler.totalWeight();
    return new BigNumber(value.toString());
  }

  public async getShareOf(account: string): Promise<BigNumber> {
    const value: ethers.BigNumber = await this._handler.shareOf(account);
    return new BigNumber(value.toString());
  }

  public async getShareValue(): Promise<BigNumber> {
    const value: ethers.BigNumber = await this._handler.shareValue();
    return new BigNumber(value.toString());
  }
}