import React, {FC, useEffect, useRef, useState} from 'react';
import {ComponentProps} from '../CommonComponent';

export interface SpinnerProps extends ComponentProps {}

export const Spinner: FC<SpinnerProps> = props => {

  const {className} = props;
  const timeout = useRef<NodeJS.Timeout>();
  // ⠋ ⠛ ⠙ ⠹ ⠸ ⢸ ⢰ ⣰ ⣠ ⣤ ⣄ ⣆ ⡆ ⡇ ⠇ ⠏
  const frames: string[] = ['\u280B', '\u281B', '\u2819', '\u2839', '\u2838', '\u28b8', '\u28b0', '\u28F0', '\u28e0', '\u28e4', '\u28c4', '\u28c6', '\u2846', '\u2847', '\u2807', '\u280F'];
  const [index, setIndex] = useState<number>(0);

  const nextFrame = () => {
    if (index === frames.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  useEffect(() => {
    timeout.current = setTimeout(nextFrame, 80);
  }, [index]);

  return (
    <span className={className}>{frames[index]}</span>
  );
};