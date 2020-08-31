import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {AppBar} from './app-bar';

export const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {},
  header: {
    width: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '& div': {
      justifyContent: 'flex-start'
    }
  },
  main: {
    width: '896px',
    margin: `0 auto`,
    paddingTop: `${theme.spacing(6)}px`,
    borderTop: `1px solid ${theme.palette.border}`,
    '& p': {
      marginBottom: `${theme.spacing(4)}px`,
      color: theme.palette.textLighter
    }
  }
}));

export const Stage: React.FC = ({children}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar className={classes.header}/>
      <main className={classes.main}>{children}</main>
    </>
  );
};