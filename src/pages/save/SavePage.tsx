import clsx from 'clsx';
import React, {useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {BasketShares} from '../../components/basket';
import {TextButton} from '../../components/button';
import {Essential} from './Essential';
import {SaveForm} from './SaveForm';
import {WithdrawForm} from './WithdrawForm';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  essential: {},
  tabs: {
    maxWidth: '1024px',
    margin: '0 auto',
    padding: `${theme.spacing(2)}px 0`,
    textAlign: 'center'
  },
  tab: {
    border: `1px solid ${theme.palette.border}`,
    borderBottomStyle: 'none',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    marginRight: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginRight: 0
    },
    '&:hover': {
      textDecoration: 'none',
    }
  },
  focusTab: {
    background: theme.palette.buttonPrimary,
    color: theme.palette.textWhite,
    '&:hover': {
      background: theme.palette.buttonPrimaryDarker,
      color: theme.palette.textWhite,
    }
  },
  saveForm: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    paddingTop: `${theme.spacing(4)}px`,
    margin: `0 auto ${theme.spacing(4)}px auto`
  },
  withdrawForm: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    paddingTop: `${theme.spacing(4)}px`,
    margin: `0 auto ${theme.spacing(4)}px auto`
  },
  poolShare: {
    maxWidth: '1024px',
    borderTop: `1px solid ${theme.palette.border}`,
    margin: `${theme.spacing(4)}px auto`,
    paddingTop: `${theme.spacing(2)}px`
  }
}));

export const SavePage: React.FC = () => {

  const classes = useStyles();
  const [mode, setMode] = useState<number>(0);

  return (
    <div className={classes.root}>
      <div className={classes.essential}>
        <Essential/>
      </div>
      <div className={classes.tabs}>
        <TextButton className={clsx(classes.tab, mode === 0 ? classes.focusTab : '')} onClicked={() => setMode(0)}>Save</TextButton>
        <TextButton className={clsx(classes.tab, mode === 1 ? classes.focusTab : '')} onClicked={() => setMode(1)}>Withdraw</TextButton>
      </div>
      {mode === 0 && (
        <div className={classes.saveForm}>
          <SaveForm/>
        </div>
      )}
      {mode === 1 && (
        <div className={classes.withdrawForm}>
          <WithdrawForm/>
        </div>
      )}
      <div className={classes.poolShare}>
        <BasketShares/>
      </div>
    </div>
  );
};

