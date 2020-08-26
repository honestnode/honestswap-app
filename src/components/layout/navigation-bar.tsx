import React from 'react';
import {createUseStyles} from 'react-jss';
import { useHistory } from 'react-router-dom';
import {HonestTheme} from '../../common/theme';

export interface Navigation {
  path: string;
  title: string;
}

export interface NavigationBarProps {
  items: Navigation[]
}

export const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const {items} = props;
  return (
    <nav>
      {items.map(item => <NavigationItem key={item.path} path={item.path} title={item.title} />)}
    </nav>
  );
};

type NavigationItemProps = Navigation;

const useItemStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    marginRight: theme.spacing(2),
    textDecoration: 'underline',
    cursor: 'pointer',
    '&:last-child': {
      marginRight: 0
    }
  }
}));

const NavigationItem : React.FC<NavigationItemProps> = (props) => {

  const history = useHistory();
  const classes = useItemStyles();
  const {path, title} = props;

  return (
    <span className={classes.root} onClick={() => history.push(path)}>{title}</span>
  );
};