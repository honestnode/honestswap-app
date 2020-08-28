import BigNumber from 'bignumber.js';
import React from 'react';

export interface ContractToken {
  name: string;
  address: string;
  icon: string;
  amount: BigNumber;
  share: BigNumber;
}

export interface ContractContextProps {
  tokens: ContractToken[];
  hUSD: ContractToken;
}

export const ContractContext = React.createContext<ContractContextProps>({
  tokens: [],
  hUSD: {} as never
});

export const ContractContextProvider: React.FC = ({children}) => {

  const [contract] = React.useState<ContractContextProps>({
    tokens: [
      {name: 'DAI', icon: '/assets/icon/dai.svg', address: 'DAI', amount: new BigNumber(1234), share: new BigNumber(0.1102)},
      {name: 'USDC', icon: '/assets/icon/usdc.svg', address: 'USDC', amount: new BigNumber(10234), share: new BigNumber(0.4251)},
      {name: 'USDT', icon: '/assets/icon/usdt.svg', address: 'USDT', amount: new BigNumber(10123), share: new BigNumber(0.3910)},
      {name: 'TUSD', icon: '/assets/icon/tusd.svg', address: 'TUSD', amount: new BigNumber(968), share: new BigNumber(0.0978)}
    ],
    hUSD: {
      name: 'hUSD', icon: '/assets/icon/husd.svg', address: 'hUSD', amount: new BigNumber(10000), share: new BigNumber(1)
    },
  });

  return (
    <ContractContext.Provider value={contract}>{children}</ContractContext.Provider>
  );
};

export const useContract = () => React.useContext<ContractContextProps>(ContractContext);