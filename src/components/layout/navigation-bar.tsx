import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {NavigationItem, NavigationItemProps} from './navigation-item';

export interface NavigationBarProps {
  items: NavigationItemProps[]
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    borderStyle: 'solid',
    borderColor: theme.palette.border,
    borderWidth: `1px 0`,
    padding: `${theme.spacing(3)}px 0`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    marginRight: theme.spacing(4),
    '&:last-child': {
      marginRight: 0
    }
  }
}));

export const NavigationBar: React.FC<NavigationBarProps> = (props) => {
  const {items} = props;
  const classes = useStyles();
  return (
    <nav className={classes.root}>
      {items.map(item => <NavigationItem className={classes.item} key={item.path} path={item.path} title={item.title} />)}
    </nav>
  );
};