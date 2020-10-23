import BigNumber from 'bignumber.js';
import React, {useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import {ERC20TokenInput, TransactionButton} from '../../components';
import {HonestTheme} from '../../config';
import {useContract, useEthereum, useTerminal} from '../../context';

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
  const ethereum = useEthereum();
  const terminal = useTerminal();

  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [transactionRequest, setTransactionRequest] = React.useState<BigNumber>();

  useEffect(() => {
    if (amount.gt(new BigNumber(0))) {
      const request = generateTransactionRequest();
      setTransactionRequest(request);
    } else {
      setTransactionRequest(undefined);
    }
  }, [amount]);

  const generateTransactionRequest = (): BigNumber => {
    return amount.shiftedBy(contract.honestAsset.decimals);
  };

  const approve = async (request: BigNumber): Promise<boolean> => {
    const allowance = await contract.honestAsset.contract.allowanceOf(ethereum.account, contract.honestAssetManager.address);
    if (allowance && allowance.lt(request)) {
      terminal.info(`Please approve spending your ${contract.honestAsset.name}...`, true);
      try {
        await contract.honestAsset.contract.approve(contract.honestAssetManager.address, request);
        terminal.success(`${contract.honestAsset.name} spending approved`);
        return true;
      } catch (ex) {
        terminal.error(`User denied ${contract.honestAsset.name} spending approve, abort`);
        return false;
      }
    }
    return true;
  };

  const estimateGas = async (request: BigNumber) => {
    return contract.honestAssetManager.estimateDepositGas(request);
  };

  const execution = async (request: BigNumber) => {
    return await contract.honestAssetManager.deposit(request);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Save</p>
        <p className={classes.subTitle}>Deposit your hUSD into the hUSD save contract and start earning interest.</p>
      </div>
      <div className={classes.form}>
        <ERC20TokenInput token={contract.honestAsset} onValueChanged={setAmount}/>
      </div>
      <TransactionButton className={classes.action} label={'Deposit hUSD'} contract={contract.honestAssetManager} approve={approve} execution={execution}
                         request={transactionRequest} calculateGas={estimateGas}/>
    </div>
  );
};