import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {useHistory, useRouteMatch} from 'react-router-dom';
import {ComponentProps} from '../../common/component-props';
import {HonestTheme} from '../../common/theme';

export interface NavigationItemProps extends ComponentProps {
  path: string;
  title: string;
}

const useStyles = createUseStyles<HonestTheme>(_ => ({
  root: {
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontSize: '18px'
  },
  highlight: {
    textDecoration: 'underline'
  }
}));

export const NavigationItem: React.FC<NavigationItemProps> = (props) => {

  const history = useHistory();
  const classes = useStyles();
  const {className, path, title} = props;
  const isHighlight = useRouteMatch({path, exact: true});

  return (
    <span className={clsx(className, classes.root, isHighlight && classes.highlight)}
          onClick={() => history.push(path)}>{title}</span>
  );
};