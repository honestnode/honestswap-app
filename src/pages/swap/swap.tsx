import React from 'react';
import {Numbers} from '../../common';
import {Button} from '../../components/button';
import {PoolShare} from '../../components/pool';
import {TokenSend} from '../../components';

interface Token {
  icon: string;
  name: string;
  balance: number;
}

export const Swap: React.FC = () => {

  const tokens : Token[] = [
    {icon: '/assets/token/dai-icon.svg', name: 'DAI', balance: 11.02},
    {icon: '/assets/token/usdc-icon.svg', name: 'USDC', balance: 102.02},
    {icon: '/assets/token/usdt-icon.svg', name: 'USDT', balance: 89035.19},
    {icon: '/assets/token/tusd-icon.svg', name: 'TUSD', balance: 0}
  ];

  const [tokenFromName, setTokenFromName] = React.useState<string>('DAI');
  const [tokenToName, setTokenToName] = React.useState<string>('USDT');
  const [amount, setAmount] = React.useState<number>(0);

  const findToken = (name: string): Token => {
    let token = tokens.filter(t => t.name === name).pop();
    if (token === undefined) {
      throw new Error('Token not found');
    }
    return token;
  };

  const tokenFrom = React.useMemo<Token>(() => {
    return findToken(tokenFromName);
  }, [tokenFromName]);


  const tokenTo = React.useMemo<Token>(() => {
    return findToken(tokenToName);
  }, [tokenToName]);

  return (
    <div>
      <div>
        <p>Swap Coins</p>
        <p>Swap stablecoins at 1:1 ratio, always.</p>
      </div>
      <div>
        <select value={tokenFromName} onChange={e => setTokenFromName(e.target.value)}>
          {tokens.map(o => <option value={o.name}>{o.name}</option>)}
        </select>
        <TokenSend icon={tokenFrom.icon} name={tokenFrom.name} balance={tokenFrom.balance} onValueChanged={v => {setAmount(v)}} />
      </div>
      <div>
        <select value={tokenToName} onChange={e => setTokenToName(e.target.value)}>
          {tokens.map(o => <option value={o.name}>{o.name}</option>)}
        </select>
        <img src={tokenTo.icon} alt={'icon'} />
        <span>{tokenTo.name}</span>
        <span>you will get</span>
        <input type={'number'} disabled={true} value={Numbers.format(amount)} />
        <span>{Numbers.format(tokenTo.balance - amount)}</span>
      </div>
      <div>
        <p>Swap Fee: 0.1%</p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
        <p>
          <Button label={'Swap'} onClick={() => {}}/>
        </p>
      </div>
      <div><PoolShare/></div>
    </div>
  );
};