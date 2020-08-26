import React from 'react';
import {Numbers} from '../../common';

export const Essential: React.FC = () => {
  const {balance, weight, apy} = {balance: 1233.8892323, weight: 1400, apy: 0.222322};
  return (
    <div>
      <div>
        <span>hUSD Saving Balance</span>
        <span>{Numbers.format(balance, {thousandsSeparate: true})}<span>hUSD</span></span>
      </div>
      <div>
        <span>Weight</span>
        <span>{Numbers.format(weight)}</span>
      </div>
      <div>
        <span>APY</span>
        <span>{Numbers.format(apy, {percentage: true})}</span>
      </div>
    </div>
  );
};
