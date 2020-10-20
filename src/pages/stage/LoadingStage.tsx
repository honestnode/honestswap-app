import React, {FC} from 'react';
import {Stage} from '../../components/layout';

export const LoadingStage: FC = () => {
  return (
    <Stage>
      <p>Loading contract...</p>
    </Stage>
  );
};