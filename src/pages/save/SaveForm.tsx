import BigNumber from 'bignumber.js';
import React, {useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ERC20TokenInput, TransactionButton} from '../../components';
import {useContract} from '../../context';

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

export const SaveForm: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();

  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [transactionRequest, setTransactionRequest] = React.useState<BigNumber>();

  useEffect(() => {
    if (amount.gt(new BigNumber(0))) {
      const request = generateTransactionRequest();
      setTransactionRequest(request);
    }
  }, [amount]);

  const generateTransactionRequest = (): BigNumber => {
    return amount.shiftedBy(contract.honestAsset.decimals);
  };

  const estimateGas = async (request: BigNumber) => {
    return contract.honestAssetManager.estimateDepositGas(request);
  };

  const execution = async (request: BigNumber) => {
    await contract.honestAssetManager.deposit(request);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Save</p>
        <p className={classes.subTitle}>Deposit your hUSD into the hUSD save contract and start earning interest.</p>
      </div>
      <div className={classes.form}>
        <ERC20TokenInput token={contract.honestAsset} spender={contract.honestAssetManager.address}
                         onValueChanged={setAmount}/>
      </div>
      <TransactionButton className={classes.action} label={'Deposit hUSD'} execution={execution}
                         request={transactionRequest} calculateGas={estimateGas}/>
    </div>
  );
};