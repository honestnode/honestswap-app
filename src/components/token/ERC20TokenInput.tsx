import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {useEthereum} from '../../context';
import {TextButton} from '../button';
import {ERC20TokenComponentProps} from './ERC20TokenComponent';
import {TokenHeader} from './TokenHeader';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  container: {},
  root: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '24px',
    background: theme.palette.background,
    padding: `${theme.spacing()}px`
  },
  header: {
    flex: '0 0 120px'
  },
  amount: {
    flex: 'auto',
    padding: `${theme.spacing()}px`,
    border: 'none',
    textAlign: 'right',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none'
    }
  },
  max: {
    flex: '0 0 40px',
    color: theme.palette.text,
    '&:hover': {
      color: theme.palette.textDarker
    }
  },
  balance: {
    flex: '0 0 100px',
    textAlign: 'right',
    color: theme.palette.textDarker,
    marginRight: `${theme.spacing(2)}px`
  },
  allowance: {
    marginTop: `${theme.spacing(2)}px`,
    display: 'flex',
    alignItems: 'center'
  },
  approveDescription: {
    flex: 'auto',
    textAlign: 'right',
    color: theme.palette.warning
  },
  approve: {
    flex: '0 0 196px'
  },
  approving: {
    flex: '0 0 180px',
    paddingLeft: `${theme.spacing(2)}px`,
    color: theme.palette.textLighter
  },
  confirming: {
    flex: '0 0 180px',
    paddingLeft: `${theme.spacing(2)}px`,
    color: theme.palette.textLighter,
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginLeft: `${theme.spacing()}px`,
      height: '20px',
      cursor: 'pointer'
    }
  },
  rejected: {
    flex: '0 0 180px',
    paddingLeft: `${theme.spacing(2)}px`,
    color: theme.palette.error
  }
}));

export interface ERC20TokenInputProps extends ERC20TokenComponentProps {
  onValueChanged: (value: BigNumber) => void;
  balance?: BigNumber;
  spender?: string;
}

enum ApproveStatus {
  PENDING, PROCESSING, CONFIRMING, REJECTED
}

export const ERC20TokenInput: FC<ERC20TokenInputProps> = props => {

  const {className, token, disabled, onValueChanged, spender} = props;
  const classes = useStyles();
  const ethereum = useEthereum();

  const [balance, setBalance] = useState<BigNumber>();
  const [value, setValue] = useState<BigNumber>(new BigNumber(0));
  const [allowance, setAllowance] = useState<BigNumber>(new BigNumber(0));
  const [approveStatus, setApproveStatus] = useState<ApproveStatus>(ApproveStatus.PENDING);

  useEffect(() => {
    if (!props.balance) {
      token.contract.getBalance(ethereum.account).then(setBalance);
    } else {
      setBalance(props.balance);
    }
    setValue(new BigNumber(0));
  }, [ethereum, token, props.balance]);

  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (spender && value.gt(new BigNumber(0))) {
        validateAllowance(spender);
      } else {
        setAllowance(new BigNumber(0));
        onValueChanged(value);
      }
    }, 500);
  }, [value, spender, ethereum]);

  const validateAllowance = (spender: string) => {
    token.contract.allowanceOf(ethereum.account, spender).then(v => {
      const a = value.minus(v);
      if (a.gt(new BigNumber(0))) {
        setAllowance(a);
        onValueChanged(new BigNumber(0));
      } else {
        setAllowance(new BigNumber(0));
        onValueChanged(value);
      }
    });
  };

  const onInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (!balance) {
      return;
    }
    let input = new BigNumber(e.target.value);
    setValue(input.isNaN() ? new BigNumber(0) : (input.gt(balance) ? value : input));
  };

  const onMaxClicked = () => {
    if (!balance) {
      return;
    }
    !disabled && setValue(balance);
  };

  const onApprove = () => {
    if (spender) {
      setApproveStatus(ApproveStatus.PROCESSING);
      token.contract.approve(spender, value).then(() => {
        validateAllowance(spender);
        setApproveStatus(ApproveStatus.CONFIRMING);
      }).catch(() => {
        setApproveStatus(ApproveStatus.REJECTED);
      });
    }
  };

  const onReloadAllowance = () => {
    spender && validateAllowance(spender);
  };

  return (
    <div className={clsx(classes.container, className)}>
      <div className={classes.root}>
        <TokenHeader className={classes.header} icon={token.icon} name={token.name}
                     symbol={token.symbol}/>
        <input className={classes.amount} type={'number'} disabled={disabled} onFocus={e => {e.target.select();}}
               value={value.toString()} onChange={onInputChanged}/>
        <TextButton className={classes.max} onClicked={onMaxClicked}>Max</TextButton>
        <span className={classes.balance}>{balance ? Numbers.format(balance.minus(value)) : '...'}</span>
      </div>
      {allowance.gt(new BigNumber(0)) && (
        <div className={classes.allowance}>
          <span
            className={classes.approveDescription}>Please approve {Numbers.format(allowance)} {token.symbol} first.</span>
          {approveStatus === ApproveStatus.PENDING && (
            <span className={classes.approve}><TextButton onClicked={onApprove}>click to approve</TextButton></span>
          )}
          {approveStatus === ApproveStatus.PROCESSING && (
            <span className={classes.approving}>Approving...</span>
          )}
          {approveStatus === ApproveStatus.CONFIRMING && (
            <span className={classes.confirming}>Confirming...<img src={'/assets/icon/refresh.svg'} alt={'Reload'}
                                                                   onClick={onReloadAllowance}/></span>
          )}
          {approveStatus === ApproveStatus.REJECTED && (
            <span className={classes.rejected}>Rejected</span>
          )}
        </div>
      )}
    </div>
  );
};