import React from 'react';
import {Button} from '../../components/button';
import {Stage} from '../../components/layout';

export interface WaitingProps {
  onConnect: () => Promise<any>;
}

export const Waiting: React.FC<WaitingProps> = ({onConnect}) => {

  return (
    <Stage>
      <p>Connect to your MetaMask wallet to use our app.</p>
      <p><Button label={'CONNECT METAMASK'} onClick={onConnect}/></p>
    </Stage>
  );
};