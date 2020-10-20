import clsx from 'clsx';
import React, {FC, useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {BasketAsset} from '../../common';
import {HonestTheme} from '../../config';
import {useBasket} from '../../context';
import {ToggleButton} from '../button';
import {ComponentProps} from '../CommonComponent';

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

export interface BasketTokenSelectProps extends ComponentProps {
  value?: number;
  excludes?: BasketAsset[];
  onTokenSelected: (token: BasketAsset) => void;
}

export const BasketTokenSelect: FC<BasketTokenSelectProps> = props => {

  const {className, value = 0, excludes = [], onTokenSelected} = props;
  const classes = useStyles();
  const basket = useBasket();
  const [selection, setSelection] = useState<BasketAsset>(basket.assets[value >= 0 ? value : basket.assets.length + value]);

  useEffect(() => {
    onCheckChanged(true, selection);
  }, []);

  const onCheckChanged = (checked: boolean, token: BasketAsset) => {
    if (checked) {
      setSelection(token);
      onTokenSelected(token);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      {Object.values(basket.assets).map(o =>
        <ToggleButton className={classes.item} key={o.symbol} label={o.symbol} checked={selection === o}
                      readonly={selection === o}
                      disabled={excludes.includes(o)} onCheckChanged={v => onCheckChanged(v, o)}/>
      )}
    </div>
  );
};