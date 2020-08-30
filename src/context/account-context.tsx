import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import Web3 from 'web3';
import {HonestTheme} from '../common/theme';
import {Button} from '../components/button';
import {AppBar} from '../components/layout';

export interface AccountContextProps {
  address: string;
  balance: (name: string) => Promise<BigNumber>;
  logout: () => Promise<void>;
}

export const AccountContext = React.createContext<AccountContextProps>({} as never);

enum AccountStatus {
  UNSUPPORTED, PENDING, CONNECTING, CONNECTED
}

const erc20Abi = [
  {
    'constant': true,
    'inputs': [{'name': '_owner', 'type': 'address'}],
    'name': 'balanceOf',
    'outputs': [{'name': 'balance', 'type': 'uint256'}],
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [{'name': '', 'type': 'uint8'}],
    'type': 'function'
  }
];

export const AccountContextProvider: React.FC = ({children}) => {

  const [status, setStatus] = React.useState<AccountStatus>(AccountStatus.PENDING);
  const [context, setContext] = React.useState<AccountContextProps>({} as never);

  const getBalance = async (address: string, token: string): Promise<BigNumber> => {
    try {
      // @ts-ignore
      const contract = new window.web3.eth.Contract(erc20Abi, token);
      const decimals = await contract.methods.decimals().call();
      const balance = await contract.methods.balanceOf(address).call();
      return new BigNumber(balance).shiftedBy(-decimals);
    } catch (e) {
      return new BigNumber(0);
    }
  };

  const logout = async () => {
    // @ts-ignore
    // TODO: close all accounts
    // await window.ethereum.request({method: 'eth_closeAccounts'});
  };

  const onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setStatus(AccountStatus.PENDING);
    } else {
      setContext({address: accounts[0], balance: (token) => getBalance(accounts[0], token), logout: logout});
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    if (window.ethereum) {
      // @ts-ignore
      window.web3 = new Web3(window.ethereum);
      // @ts-ignore
      window.web3.eth.getAccounts().then(accounts => {
        if (accounts.length !== 0) {
          onAccountsChanged(accounts);
          setStatus(AccountStatus.CONNECTED);
        }
      });
      // @ts-ignore
      window.ethereum.on('accountsChanged', onAccountsChanged);
    } else {
      setStatus(AccountStatus.UNSUPPORTED);
    }
    return () => {
      // @ts-ignore
      window.ethereum.off('accountsChanged', onAccountsChanged);
    };
  }, []);

  const onConnect = async () => {
    setStatus(AccountStatus.CONNECTING);
    // @ts-ignore
    await window.ethereum.request({method: 'eth_requestAccounts'});
    setStatus(AccountStatus.CONNECTED);
  };

  switch (status) {
    case AccountStatus.PENDING:
      return (
        <Trailer>
          <p>Connect to your MetaMask wallet to use our app.</p>
          <p><Button label={'CONNECT METAMASK'} onClick={onConnect}/></p>
        </Trailer>
      );
    case AccountStatus.CONNECTING:
      return (
        <Trailer>
          <p>Connecting to your MetaMask wallet...</p>
        </Trailer>
      );
    case AccountStatus.CONNECTED:
      return <AccountContext.Provider value={context}>{children}</AccountContext.Provider>;
    default:
      return (
        <Trailer>
          <p>Install the MetaMask browser extension to use our app in your current browser.</p>
          <p><Button label={'INSTALL METAMASK'} onClick={() => {document.location.href = 'https://metamask.io';}}/></p>
        </Trailer>
      );
  }
};

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  header: {
    width: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& div': {
      justifyContent: 'flex-start'
    }
  },
  main: {
    width: '896px',
    margin: `0 auto`,
    paddingTop: `${theme.spacing(6)}px`,
    borderTop: `1px solid ${theme.palette.border}`,
    '& p': {
      marginBottom: `${theme.spacing(4)}px`,
      color: theme.palette.textLighter
    }
  }
}));

const Trailer: React.FC = (props) => {

  const {children} = props;
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.header}/>
      <main className={classes.main}>{children}</main>
    </>
  );
};

export const useAccount = () => React.useContext<AccountContextProps>(AccountContext);