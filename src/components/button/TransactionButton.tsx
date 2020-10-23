import {TransactionResponse} from '@ethersproject/abstract-provider';
import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {useEthereum, useTerminal} from '../../context';
import {EthereumContract} from '../../contract';
import {ComponentProps} from '../CommonComponent';
import {Button} from './Button';

const useStyles = createUseStyles<HonestTheme>(() => ({
  root: {}
}));

export interface TransactionButtonProps extends ComponentProps {
  label: string;
  request: any;
  contract: EthereumContract;
  approve?: (request: any) => Promise<boolean>;
  execution: (request: any) => Promise<TransactionResponse>;
  calculateGas: (request: any) => Promise<BigNumber>;
}

export const TransactionButton: FC<TransactionButtonProps> = props => {

  const ethereum = useEthereum();
  const terminal = useTerminal();

  const {className, label, contract, approve, execution, request, calculateGas} = props;
  const classes = useStyles();
  const [executable, setExecutable] = useState<boolean>(false);
  const [state, setState] = useState<number>(-1);
  const [fee, setFee] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    if (request) {
      if (approve !== undefined) {
        setExecutable(true);
        return;
      }
      setState(0);
      calculateGas(request).then(fee => {
        setExecutable(true);
        setState(1);
        setFee(fee);
      });
    } else {
      setExecutable(false);
      setState(-1);
    }
  }, [request]);

  const onClick = async () => {
    setExecutable(false);
    const approved = await approve?.(request);
    if (approved === undefined || approved) {
      terminal.info(`Submitting your transaction...`, true);
      try {
        const tx = await execution(request);
        terminal.success(`Transaction submitted: ${tx.hash}`);
        terminal.info('Waiting for the confirmation...', true);
        await contract.waitForConfirmation(tx.hash);
        terminal.success('Transaction confirmed');
        ethereum.refresh();
      } catch (ex) {
        console.log(ex);
        if (ex.code && ex.code === 4001) {
          terminal.error('User denied transaction, abort');
        } else {
          terminal.error('Transaction execution failed, please check the request');
        }
      }
    }
    setExecutable(true);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <p><Button label={label} onClick={onClick} disabled={!executable}/></p>
      {state === 0 && <p>Estimating Gas Fee...</p>}
      {state === 1 && <p>Estimated Gas Fee: {Numbers.format(fee, {decimals: 8})} ETH</p>}
    </div>
  );
};