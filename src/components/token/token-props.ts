import BigNumber from 'bignumber.js';

export interface TokenProps {
  icon: string;
  name: string;
  value: BigNumber;
  onValueChanged?: (value: BigNumber) => void;
}