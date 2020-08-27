import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'react-jss';
import {App} from './app';
import {theme} from './common/theme';

ReactDOM.render(
  (
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  ),
  document.getElementById('root')
);

