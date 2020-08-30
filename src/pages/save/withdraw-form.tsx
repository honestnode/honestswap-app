import BigNumber from 'bignumber.js';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {Button, TokenSend} from '../../components';
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

export const WithdrawForm: React.FC = () => {

  const classes = useStyles();
  const contract = useContract();

  const [amount, setAmount] = React.useState<BigNumber>(new BigNumber(0));


  const onWithdraw = () => {};

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <p className={classes.mainTitle}>Withdraw</p>
        <p className={classes.subTitle}>Withdraw hUSD into your wallet.</p>
      </div>
      <div className={classes.form}>
        <TokenSend icon={contract.hUSD.icon} name={contract.hUSD.name} address={contract.hUSD.address}
                   value={amount} onValueChanged={(v) => setAmount(v)}/>
      </div>
      <div className={classes.action}>
        <p><Button label={'Withdraw hUSD'} onClick={onWithdraw}/></p>
        <p>Estimated Gas Fee: 0.01 ETH ($20 USD)</p>
      </div>
    </div>
  );
};