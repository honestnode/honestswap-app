import BigNumber from 'bignumber.js';
import {ERC20Token, initializeERC20Token} from './ERC20Token';

export type BasketAsset = ERC20Token;
export const initializeBasketAsset = initializeERC20Token;

export interface BasketAssetBalance extends BasketAsset {
  balance: BigNumber;
  percentage: BigNumber;
}