import React from 'react';
import {createUseStyles, ThemeProvider} from 'react-jss';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {HonestTheme, theme} from './common/theme';
import {Frame} from './components/layout';
import {AccountContextProvider, ContractContextProvider} from './context';
import {routes} from './routes';

const useStyles = createUseStyles<HonestTheme>(theme => ({
  '@global': {
    '*': {
      margin: 0,
      padding: 0,
      fontFamily: theme.typography.fontFamily
    },
    'body': {
      fontSize: theme.typography.fontSize,
      color: theme.palette.text,
      lineHeight: 1
    }
  }
}));

export const App: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      <Main/>
    </ThemeProvider>
  );
};

export const Main: React.FC = () => {

  const navigations = routes.filter(r => r.navigator).map(r => ({path: r.path, title: r.title}));
  useStyles();

  return (
    <AccountContextProvider>
      <ContractContextProvider>
        <BrowserRouter>
          <Frame navigations={navigations}>
            <Switch>
              {routes.map(r => <Route key={r.path} path={r.path} exact={r.exact} component={r.component}/>)}
              <Redirect to={'/error'}/>
            </Switch>
          </Frame>
        </BrowserRouter>
      </ContractContextProvider>
    </AccountContextProvider>
  );
};