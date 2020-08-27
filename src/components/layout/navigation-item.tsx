import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {HonestTheme} from '../../common/theme';
import {ComponentProps} from '../component-props';

export interface NavigationItemProps extends ComponentProps {
  path: string;
  title: string;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontSize: '18px'
  },
  highlight: {
    textDecoration: 'underline',
    color: theme.palette.textDarker
  }
}));

export const NavigationItem: React.FC<NavigationItemProps> = (props) => {

  const history = useHistory();
  const classes = useStyles();
  const {className, path, title} = props;
  const isHighlight = useRouteMatch({path, exact: true});

  return (
    <span className={clsx(classes.root, isHighlight && classes.highlight, className)}
          onClick={() => history.push(path)}>{title}</span>
  );
};