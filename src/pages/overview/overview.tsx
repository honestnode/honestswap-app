import React from 'react';
import {useHistory} from 'react-router-dom';
import {PoolShare} from '../../components';
import {Button} from '../../components/button';
import {Essential} from './essential';

export const Overview: React.FC = () => {

  const history = useHistory();

  return (
    <div>
      <Essential/>
      <PoolShare/>
      <div>
        <Button label={'Mint'} onClick={() => history.push('mint')} />
      </div>
    </div>
  );
};