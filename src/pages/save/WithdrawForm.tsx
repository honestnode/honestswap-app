import BigNumber from 'bignumber.js';
import React, {useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ERC20TokenInput, TransactionButton} from '../../components';
import {useContract, useEthereum} from '../../context';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
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
  form: {
    margin: `${theme.spacing(4)}px 0`
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
  }
}));

export const WithdrawForm: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();
  const ethereum = useEthereum();

  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [balance, setBalance] = React.useState<BigNumber>(new BigNumber(0));
  const [transactionRequest, setTransactionRequest] = React.useState<BigNumber>();

  useEffect(() => {
    contract.honestVault.getWeightOf(ethereum.account).then(weight => setBalance(weight.shiftedBy(-18)));
  }, [ethereum]);

  useEffect(() => {
    if (amount.gt(new BigNumber(0))) {
      const request = generateTransactionRequest();
      setTransactionRequest(request);
    }
  }, [amount]);

  const generateTransactionRequest = (): BigNumber => {
    return amount.shiftedBy(18);
  };

  const estimateGas = async (request: BigNumber) => {
    return contract.honestAssetManager.estimateWithdrawGas(request);
  };

  const execution = async (request: BigNumber) => {
    return await contract.honestAssetManager.withdraw(request);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Withdraw</p>
        <p className={classes.subTitle}>Withdraw hUSD into your wallet.</p>
      </div>
      <div className={classes.form}>
        <ERC20TokenInput token={contract.honestAsset} balance={balance} onValueChanged={setAmount}/>
      </div>
      <TransactionButton className={classes.action} label={'Withdraw hUSD'} contract={contract.honestAssetManager} execution={execution}
                         request={transactionRequest} calculateGas={estimateGas}/>
    </div>
  );
};