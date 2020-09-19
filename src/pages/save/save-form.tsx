import BigNumber from 'bignumber.js';
import React, {useEffect} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {Button, ERC20TokenInput} from '../../components';
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

  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));
  const [estimatedGas, setEstimatedGas] = React.useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    if (amount.gt(new BigNumber(0)) && !requesting) {
      estimateGas();
    }
  }, [amount]);

  const onDeposit = async () => {
    if (amount.lte(new BigNumber(0))) {
      // TODO: handle exception
      console.error('Amount should be greater than 0');
      return;
    }
    setRequesting(true);
    try {
      const request = await generateRequest();
      await contract.saving.depositRaw(request);
    } catch (ex) {
      // TODO: handle exception
      console.error(ex);
    }
    setRequesting(false);
  };

  const generateRequest = async () => {
    const decimals = await contract.hToken.getDecimals();
    return amount.shiftedBy(decimals);
  };

  const estimateGas = async () => {
    return generateRequest().then(v => {
      return contract.saving.estimateDepositGas(v).then(v => {
        return setEstimatedGas(v);
      });
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Save</p>
        <p className={classes.subTitle}>Deposit your hUSD into the hUSD save contract and start earning interest.</p>
      </div>
      <div className={classes.form}>
        <ERC20TokenInput contract={contract.hToken} value={amount} spender={contract.saving.address} onValueChanged={(v, a) => {
          setAmount(v);
          setRequesting(!a);
        }}/>
      </div>
      <div className={classes.action}>
        <p><Button label={'Deposit hUSD'} disabled={requesting} onClick={onDeposit}/></p>
        <p>Estimated Gas Fee: {Numbers.format(estimatedGas, {decimals: 8})} ETH</p>
      </div>
    </div>
  );
};