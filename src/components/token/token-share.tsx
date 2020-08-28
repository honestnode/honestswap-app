import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {ComponentProps} from '../component-props';
import {TokenProps} from './token-props';

export interface TokenShareProps extends TokenProps, ComponentProps {
  color: string;
  amount: BigNumber;
  share: BigNumber;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  leading: {
    flex: 'auto',
    borderRadius: '24px',
    background: theme.palette.background,
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing()}px`
  },
  icon: {
    width: '32px',
    height: '32px',
    marginRight: theme.spacing()
  },
  name: {
    flex: '0 0 60px'
  },
  spacer: {
    flex: 'auto'
  },
  amount: {
    display: 'inline-block',
    textAlign: 'right',
    padding: `${theme.spacing()}px 0`,
    color: theme.palette.textWhite,
    borderRadius: '4px',
    '& span': {
      paddingRight: `${theme.spacing()}px`
    }
  },
  share: {
    flex: '0 0 80px',
    textAlign: 'right',
    color: theme.palette.textDarker
  }
}));

export const TokenShare: React.FC<TokenShareProps> = (props) => {
  const {className, icon, color, name, amount, share} = props;
  const sharePercent = React.useMemo(() => Numbers.format(share, {percentage: true}), [share]);
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.leading}>
        <img className={classes.icon} src={icon} alt={'icon'}/>
        <span className={classes.name}>{name}</span>
        <span className={classes.spacer}>
        <span className={classes.amount}
              style={{width: sharePercent, background: color}}>
          <span>{Numbers.format(amount)}</span>
        </span>
      </span>
      </div>
      <span className={classes.share}>{sharePercent}</span>
    </div>
  );
};