import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {BasketShares} from '../../components/basket';
import {Essential} from './essential';
import {SaveForm} from './save-form';
import {WithdrawForm} from './withdraw-form';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  essential: {},
  saveForm: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    paddingTop: `${theme.spacing(2)}px`,
    margin: `0 auto ${theme.spacing(4)}px auto`
  },
  withdrawForm: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    paddingTop: `${theme.spacing(2)}px`,
    margin: `${theme.spacing(4)}px auto`
  },
  poolShare: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    margin: `${theme.spacing(4)}px auto`,
    paddingTop: `${theme.spacing(2)}px`
  }
}));

export const Save: React.FC = () => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.essential}>
        <Essential/>
      </div>
      <div className={classes.saveForm}>
        <SaveForm/>
      </div>
      <div className={classes.withdrawForm}>
        <WithdrawForm/>
      </div>
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};

