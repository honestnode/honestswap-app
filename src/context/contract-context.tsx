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
      {name: 'DAI', icon: '/assets/icon/dai.svg', address: '0x8f2017eabd8d4f4ee3fe3f0db2773f080d24662a', amount: new BigNumber(1234), share: new BigNumber(0.1102)},
      {name: 'USDC', icon: '/assets/icon/usdc.svg', address: '0xb7b0dbd6c4c1735ec4d4fea854d82f50fbc13ac2', amount: new BigNumber(10234), share: new BigNumber(0.4251)},
      {name: 'USDT', icon: '/assets/icon/usdt.svg', address: '0x599f1f62f0900c6e777e32ce363172a3e45efaa7', amount: new BigNumber(10123), share: new BigNumber(0.3910)},
      {name: 'TUSD', icon: '/assets/icon/tusd.svg', address: '0x599f1f62f0900c6e777e32ce363172a3e45efaa7', amount: new BigNumber(968), share: new BigNumber(0.0978)}
    ],
    hUSD: {
      name: 'hUSD', icon: '/assets/icon/husd.svg', address: '0x24a8cfe26871f83cb39adca1028caed97d6a7ed3', amount: new BigNumber(10000), share: new BigNumber(1)
    },
  });

  return (
    <ContractContext.Provider value={contract}>{children}</ContractContext.Provider>
  );
};

export const useContract = () => React.useContext<ContractContextProps>(ContractContext);