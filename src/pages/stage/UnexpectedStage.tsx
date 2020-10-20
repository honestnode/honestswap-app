import React from 'react';
import {Stage} from '../../components/layout';

export const UnexpectedStage: React.FC = () => {
  return (
    <Stage>
      <p>Something went wrong, please try again later.</p>
    </Stage>
  );
};