import React from 'react';
import {ThemeProvider} from 'react-jss';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {theme} from './common/theme';
import {Frame} from './components/layout';
import {routes} from './routes';

export const App: React.FC = () => {

  const navigations = routes.filter(r => r.navigator).map(r => ({path: r.path, title: r.title}));

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Frame navigations={navigations}>
          <Switch>
            {routes.map(r => <Route key={r.path} path={r.path} exact={r.exact} component={r.component}/>)}
            <Redirect to={'/error'}/>
          </Switch>
        </Frame>
      </BrowserRouter>
    </ThemeProvider>
  );
};