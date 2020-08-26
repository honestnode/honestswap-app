import React from 'react';
import {Numbers} from '../../common';
import {Button} from '../../components/button';
import {PoolShare} from '../../components/pool-share';
import {TokenInput} from '../../components/token-input';

export const Mint: React.FC = () => {

  const [balance] = React.useState<number>(50);
  const [amount, setAmount] = React.useState<Record<string, number>>({
    DAI: 0,
    USDC: 0,
    USDT: 0,
    TUSD: 0
  });

  const totalAmount = React.useMemo(() => {
    return Object.entries(amount).map(([_, v]) => v).reduce((pv, cv) => pv + cv);
  }, [amount]);

  const tokens = [
    {icon: '/assets/token/dai-icon.svg', name: 'DAI', balance: 11.02},
    {icon: '/assets/token/usdc-icon.svg', name: 'USDC', balance: 102.02},
    {icon: '/assets/token/usdt-icon.svg', name: 'USDT', balance: 89035.19},
    {icon: '/assets/token/tusd-icon.svg', name: 'TUSD', balance: 0}
  ];

  const onTokenInputChanged = (name: string, value: number) => {
    setAmount({...amount, [name]: value});
  };

  const onMint = () => {

  };

  return (
    <div>
      <div>
        <p>MINT hUSD</p>
        <p>Deposit stablecoins, get hUSD at 1:1 ratio.</p>
      </div>
      <div>
        {tokens.map(t => <TokenInput key={t.name} icon={t.icon} name={t.name} balance={t.balance}
                                     onValueChanged={value => onTokenInputChanged(t.name, value)}/>)}
      </div>
      <div>{`You will get ${totalAmount} hUSD`}</div>
      <div>
        <p>{`Current balance ${Numbers.format(balance)} hUSD`}</p>
        <p>{`Mint amount +${Numbers.format(totalAmount)} hUSD`}</p>
        <p>{`New balance ${Numbers.format(balance + totalAmount)} hUSD`}</p>
      </div>
      <div>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
      <div>
        <Button label={'Mint'} onClick={onMint}/>
      </div>
      <PoolShare/>
    </div>
  );
};