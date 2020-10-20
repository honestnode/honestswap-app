import clsx from 'clsx';
import React, {FC} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../config';
import {ComponentProps} from '../CommonComponent';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    height: '32px',
    borderRadius: '24px',
    background: theme.palette.background,
    padding: `${theme.spacing()}px`,
    display: 'flex',
    justifyContent: 'center'
  },
  '@keyframes lds-ellipsis1': {
    '0%': {
      transform: 'scale(0)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  },
  '@keyframes lds-ellipsis2': {
    '0%': {
      transform: 'translate(0, 0)'
    },
    '100%': {
      transform: 'translate(24px, 0)'
    }
  },
  '@keyframes lds-ellipsis3': {
    '0%': {
      transform: 'scale(1)'
    },
    '100%': {
      transform: 'scale(0)'
    }
  },
  loading: {
    display: 'inline-block',
    position: 'relative',
    width: '80px',
    height: '32px'
  },
  dot: {
    position: 'absolute',
    width: '10px',
    height: '10px',
    top: '11px',
    borderRadius: '50%',
    background: '#fff',
    animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
    '&:nth-child(1)': {
      left: '8px',
      animation: '$lds-ellipsis1 0.6s infinite'
    },
    '&:nth-child(2)': {
      left: '8px',
      animation: '$lds-ellipsis2 0.6s infinite'
    },
    '&:nth-child(3)': {
      left: '32px',
      animation: '$lds-ellipsis2 0.6s infinite'
    },
    '&:nth-child(4)': {
      left: '56px',
      animation: '$lds-ellipsis3 0.6s infinite'
    }
  }
}));

export const ERC20TokenLoading: FC<ComponentProps> = ({className}) => {

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.loading}>
        <div className={classes.dot}/>
        <div className={classes.dot}/>
        <div className={classes.dot}/>
        <div className={classes.dot}/>
      </div>
    </div>
  );
};