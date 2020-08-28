import BigNumber from 'bignumber.js';
import React from 'react';

export interface AccountContextProps {
  address: string;
  balance: (name: string) => BigNumber;
}

export const AccountContext = React.createContext<AccountContextProps>({} as never);

export const AccountContextProvider: React.FC = ({children}) => {

  const [context] = React.useState<AccountContextProps>({
    address: '0xa9167658C30598E70a4643909B86B7d0ad2E2d2A',
    balance: name => {
      const balances: Record<string, BigNumber> = {
        'DAI': new BigNumber(12.34),
        'USDT': new BigNumber(23.45),
        'USDC': new BigNumber(0),
        'TUSD': new BigNumber(34.56),
        'hUSD': new BigNumber(100)
      };
      return balances[name] || 0;
    }
  });

  return (
    <AccountContext.Provider value={context}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => React.useContext<AccountContextProps>(AccountContext);