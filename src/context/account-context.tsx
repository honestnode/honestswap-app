import React from 'react';

export interface AccountContextProps {
  address: string;
  balance: (name: string) => number;
}

export const AccountContext = React.createContext<AccountContextProps>({} as never);

export const AccountContextProvider: React.FC = ({children}) => {

  const [context] = React.useState<AccountContextProps>({
    address: '0xa9167658C30598E70a4643909B86B7d0ad2E2d2A',
    balance: name => {
      const balances: Record<string, number> = {
        'DAI': 12.34,
        'USDT': 23.45,
        'USDC': 0,
        'TUSD': 34.56
      };
      return balances[name] || 0;
    }
  });

  return (
    <AccountContext.Provider value={context}>{children}</AccountContext.Provider>
  );
};

export const useAccount = () => React.useContext<AccountContextProps>(AccountContext);