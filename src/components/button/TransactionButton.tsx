import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {ComponentProps} from '../CommonComponent';
import {Button} from './Button';

const useStyles = createUseStyles<HonestTheme>(() => ({
  root: {}
}));

export interface TransactionButtonProps extends ComponentProps {
  label: string;
  request: any;
  execution: (request: any) => Promise<void>;
  calculateGas: (request: any) => Promise<BigNumber>;
}

export const TransactionButton: FC<TransactionButtonProps> = props => {

  const {className, label, execution, request, calculateGas} = props;
  const classes = useStyles();
  const [requesting, setRequesting] = useState<boolean>(false);
  const [state, setState] = useState<number>(-1);
  const [fee, setFee] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    if (request) {
      setState(0);
      calculateGas(request).then(fee => {
        setState(1);
        setFee(fee);
      });
    } else {
      setState(-1);
    }
  }, [request]);

  const onClick = async () => {
    setRequesting(true);
    await execution(request);
    setRequesting(false);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <p><Button label={label} onClick={onClick} disabled={state === -1 || requesting}/></p>
      {state === 0 && <p>Estimating Gas Fee...</p>}
      {state === 1 && <p>Estimated Gas Fee: {Numbers.format(fee, {decimals: 8})} ETH</p>}
    </div>
  );
};