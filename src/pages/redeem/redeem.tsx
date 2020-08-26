import React from 'react';
import {Numbers} from '../../common';
import {Button, Checkbox, PoolShare, TokenInput} from '../../components';

export const Redeem: React.FC = () => {

  const [amount, setAmount] = React.useState<number>(0);
  const ratios = [
    {icon: '/assets/token/dai-icon.svg', name: 'DAI', balance: 11.02, ratio: 0.1102},
    {icon: '/assets/token/usdc-icon.svg', name: 'USDC', balance: 102.02, ratio: 0.4251},
    {icon: '/assets/token/usdt-icon.svg', name: 'USDT', balance: 89035.19, ratio: 0.3910},
    {icon: '/assets/token/tusd-icon.svg', name: 'TUSD', balance: 11, ratio: 0.0778}
  ];

  const onRedeem = () => {};

  return (
    <div>
      <div>
        <p>REDEEM hUSD</p>
        <p>Withdraw stablecoins to your wallet.</p>
      </div>
      <div>
        <TokenInput icon={''} name={'hUSD'} balance={123.11} onValueChanged={v => {setAmount(v)}} />
        <p>
          <Checkbox label={'Redeem with all assets proportionally'} onValueChanged={() => {}} />
        </p>
      </div>
      <div>
        {ratios.map(({icon, name, balance, ratio}) => <RedeemTokenResult icon={icon} name={name} value={amount * ratio} balance={balance - amount* ratio}/>)}
        <p>Redeem Fee: 0.1%</p>
      </div>
      <div>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
      <div>
        <Button label={'Redeem'} onClick={onRedeem} />
      </div>
      <div>
        <PoolShare />
      </div>
    </div>
  );
};

interface RedeemTokenResultProps {
  icon: string;
  name: string;
  value: number;
  balance: number;
}

const RedeemTokenResult: React.FC<RedeemTokenResultProps> = (props) => {

  const {icon, name, value, balance} = props

  return (
    <div>
      <img src={icon} alt={'icon'} />
      <span>{name}</span>
      <span>you will get</span>
      <input type={'number'} disabled={true} value={Numbers.format(value)} />
      <span>{Numbers.format(balance)}</span>
    </div>
  );
};

