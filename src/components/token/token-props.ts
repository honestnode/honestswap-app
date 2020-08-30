import BigNumber from 'bignumber.js';

export interface TokenProps {
  icon: string;
  name: string;
  address: string;
  value: BigNumber;
  decimals?: number;
  onValueChanged?: (value: BigNumber) => void;
}