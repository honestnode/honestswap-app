import React from 'react';
import {Button} from '../../components/button';
import {Stage} from '../../components/layout';

export const Unsupported: React.FC = () => {

  return (
    <Stage>
      <p>Install the MetaMask browser extension to use our app in your current browser.</p>
      <p><Button label={'INSTALL METAMASK'} onClick={() => {document.location.href = 'https://metamask.io';}}/></p>
    </Stage>
  );
};