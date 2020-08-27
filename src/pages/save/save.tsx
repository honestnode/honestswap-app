import React from 'react';
import {Button} from '../../components/button';
import {PoolShare} from '../../components/pool';
import {TokenInput} from '../../components/token-input';
import {Essential} from './essential';

export const Save: React.FC = () => {

  return (
    <div>
      <div>
        <Essential />
      </div>
      <div>
        <SaveForm />
      </div>
      <div>
        <WithdrawForm />
      </div>
      <div>
        <PoolShare />
      </div>
    </div>
  );
};

const SaveForm: React.FC = () => {

  const [balance, setBalance] = React.useState<number>(20.02);

  const onDeposit = () => {};

  return (
    <div>
      <div>
        <p>Save</p>
        <p>Deposit your hUSD into the hUSD save contract and start earning interest.</p>
      </div>
      <div>
        <TokenInput icon={''} name={'hUSD'} balance={balance} onValueChanged={(v) => setBalance(balance - v)} />
      </div>
      <div>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
        <p><Button label={'Deposit hUSD'} onClick={onDeposit} /></p>
      </div>
    </div>
  );
};

const WithdrawForm: React.FC = () => {

  const [balance, setBalance] = React.useState<number>(20.02);

  const onWithdraw = () => {};

  return (
    <div>
      <div>
        <p>Withdraw</p>
        <p>Withdraw hUSD into your wallet.</p>
      </div>
      <div>
        <TokenInput icon={''} name={'hUSD'} balance={balance} onValueChanged={(v) => setBalance(balance - v)} />
      </div>
      <div>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
        <p><Button label={'Withdraw hUSD'} onClick={onWithdraw} /></p>
      </div>
    </div>
  );
};