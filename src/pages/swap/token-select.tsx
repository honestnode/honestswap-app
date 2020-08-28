import clsx from 'clsx';
import React from 'react';
import {createUseStyles} from 'react-jss';
import {HonestTheme} from '../../common/theme';
import {ToggleButton} from '../../components/button';
import {ComponentProps} from '../../components/component-props';

export interface TokenSelectProps extends ComponentProps {
  options: string[];
  disabled?: string[];
  value?: string;
  onSelectionChanged: (value: string) => void;
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

export const TokenSelect: React.FC<TokenSelectProps> = (props) => {

  const {className, options, disabled = [], value = options[0], onSelectionChanged} = props;
  const classes = useStyles();
  const [selection, setSelection] = React.useState<string>(value);

  const onCheckChanged = (checked: boolean, value: string): void => {
    if (checked) {
      setSelection(value);
      onSelectionChanged(value);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      {options.map(o =>
        <ToggleButton className={classes.item} key={o} label={o} checked={selection === o} readonly={selection === o}
                      disabled={disabled.includes(o)} onCheckChanged={v => onCheckChanged(v, o)}/>
      )}
    </div>
  );
};