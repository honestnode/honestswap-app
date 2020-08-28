import * as React from 'react';

export interface ContractToken {
  name: string;
  address: string;
  icon: string;
  amount: number;
  share: number;
}

export interface ContractContextProps {
  tokens: ContractToken[];
}

export const ContractContext = React.createContext<ContractContextProps>({
  tokens: []
});

export const ContractContextProvider: React.FC = ({children}) => {

  const [contract] = React.useState<ContractContextProps>({tokens: [
      {name: 'DAI', icon: '/assets/icon/dai.svg', address: 'DAI', amount: 1234, share: 0.1102},
      {name: 'USDC', icon: '/assets/icon/usdc.svg', address: 'USDC', amount: 10234, share: 0.4251},
      {name: 'USDT', icon: '/assets/icon/usdt.svg', address: 'USDT', amount: 10123, share: 0.3910},
      {name: 'TUSD', icon: '/assets/icon/tusd.svg', address: 'TUSD', amount: 968, share: 0.0978}
    ]});

  return (
    <ContractContext.Provider value={contract}>{children}</ContractContext.Provider>
  );
};

export const useContract = () => React.useContext<ContractContextProps>(ContractContext);