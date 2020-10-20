import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC} from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../config';
import {ERC20TokenComponentProps} from './ERC20TokenComponent';
import {TokenHeader} from './TokenHeader';

export interface ERC20TokenShareProps extends ERC20TokenComponentProps {
  amount: BigNumber;
  share: BigNumber;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  main: {
    flex: 'auto',
    borderRadius: '24px',
    background: theme.palette.background,
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing()}px`
  },
  header: {
    flex: '0 0 120px'
  },
  chart: {
    flex: 'auto',
    overflow: 'hidden'
  },
  bar: {
    display: 'inline-block',
    textAlign: 'right',
    padding: `${theme.spacing()}px 0`,
    color: theme.palette.textWhite,
    // height: '16px',
    borderRadius: '4px',
    '& span': {
      paddingRight: `${theme.spacing()}px`
    }
  },
  amount: {
    fontSize: '14px',
    marginRight: `${theme.spacing()}px`
  },
  share: {
    flex: '0 0 80px',
    textAlign: 'right',
    color: theme.palette.textDarker
  }
}));

export const ERC20TokenShare: FC<ERC20TokenShareProps> = props => {

  const {className, token, amount, share = new BigNumber(0)} = props;
  const classes = useStyles();
  const theme = useTheme<HonestTheme>();

  // useEffect(() => {
  //   setToken({
  //     icon: token.icon,
  //     name: token.name,
  //     symbol: token.symbol,
  //     color: theme.palette.token(token.symbol.toLowerCase()),
  //     amount: amount,
  //     share: share
  //   });
  // }, [token, amount, share]);

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.main}>
        <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
        <div className={classes.chart}>
          <span className={classes.bar}
                style={{
                  width: Numbers.format(share, {percentage: true}),
                  background: theme.palette.token(token.symbol.toLowerCase())
                }}/>
        </div>
        <span className={classes.amount}>{Numbers.format(amount)}</span>
      </div>
      <div className={classes.share}>{Numbers.format(share, {percentage: true})}</div>
    </div>
  );
};