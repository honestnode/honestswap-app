import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {Button, ERC20TokenInput} from '../../components';
import {useContract, useSaving} from '../../context';

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
  const saving = useSaving();

  const [requesting, setRequesting] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));

  const onWithdraw = async () => {
    if (amount.lte(new BigNumber(0))) {
      // TODO: handle exception
      console.error('Amount should be greater than 0');
      return;
    }
    setRequesting(true);
    try {
      const decimals = await contract.hToken.getDecimals();
      await contract.saving.withdrawRaw(amount.shiftedBy(decimals));
    } catch (ex) {
      // TODO: handle exception
      console.error(ex);
    }
    setRequesting(false);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Withdraw</p>
        <p className={classes.subTitle}>Withdraw hUSD into your wallet.</p>
      </div>
      <div className={classes.form}>
        <ERC20TokenInput contract={contract.hToken} value={amount} balance={saving.balance} onValueChanged={(v) => setAmount(v)}/>
      </div>
      <div className={classes.action}>
        <p><Button label={'Withdraw hUSD'} disabled={requesting} onClick={onWithdraw}/></p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
    </div>
  );
};