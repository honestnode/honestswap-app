import React from 'react';
import {Stage} from '../../components/layout';

export const UnsupportedStage: React.FC = () => {

  return (
    <Stage>
      <p>Please switch your MetaMask network.</p>
    </Stage>
  );
};