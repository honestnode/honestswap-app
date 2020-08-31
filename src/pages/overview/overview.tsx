import React from 'react';
import {createUseStyles} from 'react-jss';
import {useHistory} from 'react-router-dom';
import {HonestTheme} from '../../common/theme';
import {PoolShare} from '../../components';
import {Button} from '../../components/button';
import {Essential} from './essential';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    padding: `${theme.spacing(4)}px ${theme.spacing(2)}px ${theme.spacing(2)}px`
  },
  essential: {},
  poolShare: {
    maxWidth: '1024px',
    margin: `${theme.spacing(4)}px auto`
  },
  action: {
    textAlign: 'center',
    marginTop: `${theme.spacing(10)}px`
  }
}));

export const Overview: React.FC = () => {

  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.essential}>
        <Essential/>
      </div>
      <div className={classes.poolShare}>
        <PoolShare/>
      </div>
      <div className={classes.action}>
        <Button label={'MINT hUSD'} onClick={() => history.push('mint')}/>
      </div>
    </div>
  );
};