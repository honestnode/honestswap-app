import React from 'react';
import {Numbers} from '../../common';

export const PoolShare: React.FC = () => {

  const tokens = [
    {name: 'DAI', amount: 1234, share: 0.1102},
    {name: 'USDC', amount: 10234, share: 0.4251},
    {name: 'USDT', amount: 10123, share: 0.3910},
    {name: 'TUSD', amount: 968, share: 0.0778}
  ];

  return (
    <div>
      <div>hUSD Pool Share</div>
      {tokens.map(token => <TokenShare key={token.name} name={token.name} amount={token.amount} share={token.share}/>)}
    </div>
  );
};

interface TokenShareProps {
  name: string;
  amount: number;
  share: number;
}

const TokenShare: React.FC<TokenShareProps> = (props) => {

  const {name, amount, share} = props;

  return (
    <div>
      <span>Icon</span>
      <span>{name}</span>
      <span>{Numbers.format(amount)}</span>
      <span>{Numbers.format(share, {percentage: true})}</span>
    </div>
  );
};