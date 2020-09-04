import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {useBasket} from '../../context';
import {BasketToken} from '../../contract';
import {ToggleButton} from '../button';
import {ComponentProps} from '../component-props';

export interface BasketTokenSelectProps extends ComponentProps {
  value?: number;
  excludes?: BasketToken[];
  onTokenSelected: (token: BasketToken) => void;
}

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    display: 'flex'
  },
  item: {
    marginRight: `${theme.spacing(2)}px`,
    '&:last-child': {
      marginRight: 0
    }
  }
}));

export const BasketTokenSelect: FC<BasketTokenSelectProps> = props => {

  const {className, value = 0, excludes = [], onTokenSelected} = props;
  const classes = useStyles();
  const basket = useBasket();
  const [selection, setSelection] = useState<BasketToken>(basket.tokens[value >= 0 ? value : basket.tokens.length + value]);

  useEffect(() => {
    onCheckChanged(true, selection);
  }, []);

  const onCheckChanged = (checked: boolean, token: BasketToken) => {
    if (checked) {
      setSelection(token);
      onTokenSelected(token);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      {basket.tokens.map(o =>
        <ToggleButton className={classes.item} key={o.symbol} label={o.symbol} checked={selection === o}
                      readonly={selection === o}
                      disabled={excludes.includes(o)} onCheckChanged={v => onCheckChanged(v, o)}/>
      )}
    </div>
  );
};