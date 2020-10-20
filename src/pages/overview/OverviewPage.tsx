import React from 'react';
import {createUseStyles} from 'react-jss';
import {useHistory} from 'react-router-dom';
import {HonestTheme} from '../../config';
import {BasketShares} from '../../components/basket';
import {Button} from '../../components/button';
import {Essential} from './Essential';

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

export const OverviewPage: React.FC = () => {

  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.essential}>
        <Essential/>
      </div>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
      <div className={classes.action}>
        <Button label={'MINT hUSD'} onClick={() => history.push('mint')}/>
      </div>
    </div>
  );
};