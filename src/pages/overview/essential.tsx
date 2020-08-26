import React from 'react';
import {Numbers} from '../../common';

export const Essential: React.FC = () => {
  const {supply, apy} = {supply: 412343245.191234412, apy: 0.222322};
  return (
    <div>
      <div>
        <span>Total hUSD supply</span>
        <span>{Numbers.format(supply, {thousandsSeparate: true})}</span>
      </div>
      <div>
        <span>APY</span>
        <span>{Numbers.format(apy, {percentage: true})}</span>
      </div>
    </div>
  );
};
