import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles, useTheme} from 'react-jss';
import {Numbers} from '../../common';
import {HonestTheme} from '../../common/theme';
import {ERC20TokenLoading} from './erc20-token-loading';
import {ERC20TokenComponentProps, ERC20TokenShareState} from './token';
import {TokenHeader} from './token-header';

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

  const {className, contract, amount, share} = props;
  const classes = useStyles();
  const theme = useTheme<HonestTheme>();

  const [token, setToken] = useState<ERC20TokenShareState>();

  useEffect(() => {
    let r: ERC20TokenShareState & {decimals: number} = {} as never;
    Promise.all([
      contract.getName().then(name => r.name = name),
      contract.getSymbol().then(symbol => r.symbol = symbol),
      contract.getIcon().then(icon => r.icon = icon),
      contract.getDecimals().then(decimals => r.decimals = decimals)
    ]).then(() => {
      setToken({
        icon: r.icon,
        name: r.name,
        symbol: r.symbol,
        color: theme.palette.token(r.symbol.toLowerCase()),
        amount: amount,
        share: share
      });
    });
  }, [contract]);

  return token ? (
    <div className={clsx(classes.root, className)}>
      <div className={classes.main}>
        <TokenHeader className={classes.header} icon={token.icon} name={token.name} symbol={token.symbol}/>
        <div className={classes.chart}>
          <span className={classes.bar}
                style={{width: Numbers.format(token.share, {percentage: true}), background: token.color}}/>
        </div>
        <span className={classes.amount}>{Numbers.format(token.amount)}</span>
      </div>
      <div className={classes.share}>{Numbers.format(token.share, {percentage: true})}</div>
    </div>
  ) : <ERC20TokenLoading className={className}/>;
};