import {ERC20Token, initializeERC20Token} from './ERC20Token';

export type HonestAsset = ERC20Token;
export const initializeHonestAsset = initializeERC20Token;