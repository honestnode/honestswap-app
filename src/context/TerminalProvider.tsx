import clsx from 'clsx';
import React, {createContext, FC, useContext, useEffect, useRef, useState} from 'react';
import {createUseStyles} from 'react-jss';
import {Spinner} from '../components/spinner/Spinner';
import {HonestTheme} from '../config';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  root: {
    position: 'fixed',
    background: '#000',
    opacity: '0.8',
    borderRadius: '2px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    right: 0,
    bottom: 0,
    width: '20vw',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
    transition: 'height 0.15s ease-out',
    '& *': {
      fontFamily: 'monospace,monospace',
      fontSize: '14px'
    }
  },
  hidden: {
    height: 0
  },
  header: {
    padding: `${theme.spacing(1.5)}px ${theme.spacing()}px`,
    borderBottom: `1px solid ${theme.palette.border}`,
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    textTransform: 'uppercase'
  },
  close: {
    display: 'block',
    width: '16px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  console: {
    padding: `${theme.spacing()}px`,
    overflowY: 'auto'
  },
  item: {
    display: 'flex',
    marginBottom: theme.spacing(),
    lineHeight: '1.5',
    wordBreak: 'break-word',
    '&:last-child': {
      marginBottom: 0
    }
  },
  prompt: {
    flex: 'none',
    marginRight: theme.spacing()
  },
  message: {},
  current: {
    color: '#fff'
  },
  success: {
    color: theme.palette.success
  },
  warning: {
    color: theme.palette.warning
  },
  error: {
    color: theme.palette.error
  }
}));

export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface Log {
  level: LogLevel;
  message: string;
  processing?: boolean;
}

export interface TerminalContextProps {
  open: () => void;
  close: () => void;
  log: (level: LogLevel, message: string, processing?: boolean) => void;
  info: (message: string, processing?: boolean) => void;
  success: (message: string, processing?: boolean) => void;
  warning: (message: string, processing?: boolean) => void;
  error: (message: string, processing?: boolean) => void;
}

const TerminalContext = createContext<TerminalContextProps>({} as never);

export const TerminalProvider: FC = props => {

  const classes = useStyles();
  const timer = useRef<NodeJS.Timeout>();
  const consoleBottom = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<boolean>(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const open = () => {
    setShown(true);
  };

  const close = () => {
    setLogs([]);
    setShown(false);
  };

  const log = (level: LogLevel, message: string, processing: boolean = false) => {
    setShown(true);
    setLogs(logs => [...logs, {level: level, message: message, processing: processing}]);
    if (!processing) {
      timer.current = setTimeout(close, level === 'error' ? 8000 : 5000);
    } else {
      timer.current && clearTimeout(timer.current);
    }
  };

  const info = (message: string, processing?: boolean) => log('info', message, processing);

  const success = (message: string, processing?: boolean) => log('success', message, processing);

  const warning = (message: string, processing?: boolean) => log('warning', message, processing);

  const error = (message: string, processing?: boolean) => log('error', message, processing);

  useEffect(() => {
    consoleBottom.current?.scrollIntoView({behavior: 'smooth'});
  }, [logs]);

  return (
    <TerminalContext.Provider value={{open, close, log, info, success, warning, error}}>
      {props.children}
      <div className={clsx(classes.root, !shown && classes.hidden)}>
        <div className={classes.header}><span className={classes.title}>TRANSACTION TERMINAL</span><span className={classes.close} onClick={close}>{'\u2A09'}</span></div>
        <div className={classes.console}>
          {logs.map((n, i) => (
            <div key={i} className={classes.item}>
              {(i === logs.length - 1) && n.processing ? (
                <Spinner className={classes.prompt}/>
              ) : (
                <span className={classes.prompt}>❯</span>
              )}
              <span
                className={clsx(classes.message, (i === logs.length - 1 && classes.current), classes[n.level])}>{n.message}</span>
            </div>
          ))}
          <div ref={consoleBottom}/>
        </div>
      </div>
    </TerminalContext.Provider>
  );
};

export const useTerminal = () => useContext<TerminalContextProps>(TerminalContext);