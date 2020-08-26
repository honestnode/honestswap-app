import React from 'react';

export interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {

  const {label, onClick} = props;

  return (
    <button onClick={onClick}>{label}</button>
  );
};