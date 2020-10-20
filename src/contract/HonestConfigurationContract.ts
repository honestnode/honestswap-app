import BigNumber from 'bignumber.js';
import {ethers} from 'ethers';
import * as HonestConfigurationArtifact from '../artifacts/HonestConfiguration.json';
import {BasketAsset, HonestAsset, initializeBasketAsset, initializeHonestAsset} from '../common';
import {ERC20Contract} from './ERC20Contract';
import {EthereumContract, EthereumContractProvider} from './EthereumContract';

export class HonestConfigurationContract extends EthereumContract {

  constructor(address: string, provider: EthereumContractProvider) {
    super(address, HonestConfigurationArtifact.abi, provider);
  }

  public async getHonestAsset(): Promise<HonestAsset> {
    const asset: string = await this._handler.honestAsset();
    return await initializeHonestAsset(new ERC20Contract(asset, this._provider));
  }

  public async getBasketAssets(): Promise<Record<string, BasketAsset>> {
    const assets: string[] = await this._handler.activeBasketAssets();
    const result: Record<string, BasketAsset> = {};
    for (let i = 0; i < assets.length; ++i) {
      const asset = await initializeBasketAsset(new ERC20Contract(assets[i], this._provider));
      result[asset.symbol] = asset;
    }
    return result;
  }

  public async getSwapFeeRate(): Promise<BigNumber> {
    const feeRate: ethers.BigNumber = await this._handler.swapFeeRate();
    return new BigNumber(feeRate.toString());
  }

  public async getRedeemFeeRate(): Promise<BigNumber> {
    const feeRate: ethers.BigNumber = await this._handler.redeemFeeRate();
    return new BigNumber(feeRate.toString());
  }
}