import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {TokenReceived, TokenSend} from '../../components';
import {Button} from '../../components/button';
import {PoolShare} from '../../components/pool';
import {ContractToken, useAccount, useContract} from '../../context';
import {TokenSelect} from './token-select';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
  },
  title: {
    textAlign: 'center'
  },
  mainTitle: {
    color: theme.palette.textDarker,
    fontSize: '20px'
  },
  subTitle: {
    marginTop: `${theme.spacing(2)}px`
  },
  from: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`
  },
  fromSelect: {
    padding: `${theme.spacing(2)}px 0`
  },
  fromForm: {},
  select: {
    marginLeft: `${theme.spacing(6)}px`,
    padding: 0,
    border: `none`
  },
  arrow: {
    textAlign: 'center',
    '& img': {
      width: '32px',
      height: '32px'
    }
  },
  to: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`
  },
  toSelect: {
    padding: `${theme.spacing(2)}px 0`,
    justifyContent: 'flex-end'
  },
  toForm: {},
  fee: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto ${theme.spacing(2)}px`,
    textAlign: 'right',
    fontSize: '14px',
    color: theme.palette.textLighter
  },
  action: {
    textAlign: 'center',
    marginTop: `${theme.spacing(4)}px`,
    '& p': {
      marginBottom: `${theme.spacing(2)}px`,
      color: theme.palette.textLighter,
      fontSize: '14px',
      '&:last-child': {
        marginBottom: 0
      }
    }
  },
  poolShare: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    margin: `${theme.spacing(4)}px auto`,
    paddingTop: `${theme.spacing(2)}px`
  }
}));

export const Swap: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();
  const account = useAccount();

  const tokenOptions = contract.tokens.map(t => t.name);

  const [tokenFromName, setTokenFromName] = React.useState<string>(tokenOptions[0]);
  const [tokenToName, setTokenToName] = React.useState<string>(tokenOptions[tokenOptions.length - 1]);
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));

  const findToken = (name: string): ContractToken => {
    let token = contract.tokens.filter(t => t.name === name).pop();
    if (token === undefined) {
      throw new Error('Token not found');
    }
    return token;
  };

  const tokenFrom = React.useMemo<ContractToken>(() => {
    return findToken(tokenFromName);
  }, [tokenFromName]);


  const tokenTo = React.useMemo<ContractToken>(() => {
    return findToken(tokenToName);
  }, [tokenToName]);

  React.useEffect(() => {
    setAmount(new BigNumber(0));
  }, [tokenFromName, tokenToName])

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Swap Coins</p>
        <p className={classes.subTitle}>Swap stablecoins at 1:1 ratio, always.</p>
      </div>
      <div className={classes.from}>
        <TokenSelect className={classes.fromSelect} options={tokenOptions} value={tokenFromName} disabled={[tokenToName]}
                     onSelectionChanged={t => setTokenFromName(t)}/>
        <TokenSend className={classes.fromForm} icon={tokenFrom.icon} name={tokenFrom.name} value={amount}
                   balance={account.balance(tokenFrom.address)} onValueChanged={v => setAmount(v)}/>
      </div>
      <div className={classes.arrow}><img src={'/assets/icon/arrow-down.svg'} alt={'to'}/></div>
      <div className={classes.to}>
        <TokenSelect className={classes.toSelect} options={tokenOptions} value={tokenToName} disabled={[tokenFromName]}
                     onSelectionChanged={t => setTokenToName(t)}/>
        <TokenReceived className={classes.toForm} icon={tokenTo.icon} name={tokenTo.name} disabled={true}
                       value={amount}/>
      </div>
      <div className={classes.fee}>Swap Fee: 0.1%</div>
      <div className={classes.action}>
        <p><Button label={'SWAP'} onClick={() => {}}/></p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
      <div className={classes.poolShare}>
        <PoolShare/>
      </div>
    </div>
  );
};