import BigNumber from 'bignumber.js';
import {ERC20Contract} from '../../contract';
import {ComponentProps} from '../component-props';

export interface TokenState {
  icon: string;
  name: string;
  symbol: string;
  color?: string;
}

export interface ERC20TokenBalanceState extends TokenState {
  balance: BigNumber;
}

export interface ERC20TokenShareState extends TokenState {
  amount: BigNumber;
  share: BigNumber;
}

export interface ERC20TokenExpectState extends TokenState {}

export interface ERC20TokenComponentProps extends ComponentProps {
  contract: ERC20Contract;
}