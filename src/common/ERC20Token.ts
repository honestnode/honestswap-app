import BigNumber from 'bignumber.js';
import {ERC20Contract} from '../contract';

export interface ERC20Token {
  contract: ERC20Contract;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
}

export const initializeERC20Token = async (contract: ERC20Contract): Promise<ERC20Token> => {
  const name = await contract.getName();
  const symbol = await contract.getSymbol();
  const decimals = await contract.getDecimals();
  const icon = `/assets/icon/${symbol.toLowerCase()}.svg`;
  return {
    contract,
    address: contract.address,
    name,
    symbol,
    decimals,
    icon
  };
};

export interface ERC20TokenBalance {
  balance: BigNumber;
}