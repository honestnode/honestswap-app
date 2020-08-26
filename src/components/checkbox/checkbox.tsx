import React from 'react';

export interface CheckboxProps {
  label: string;
  onValueChanged: (v: boolean) => void;
  initialValue?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {

  const {label, onValueChanged, initialValue = false} = props;

  const [value, setValue] = React.useState<boolean>(initialValue);

  React.useEffect(() => {
    onValueChanged(value);
  }, [value]);

  return (
    <label>
      <input type={'checkbox'} value={value.toString()} onChange={e => setValue(Boolean(e.target.value))} /><span>{label}</span>
    </label>
  );
};