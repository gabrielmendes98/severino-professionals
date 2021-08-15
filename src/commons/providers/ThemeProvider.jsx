import '@fontsource/roboto';
import '@fontsource/ubuntu';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from '../styles/global';
import theme from '../styles/theme';

const ThemeProvider = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <StylesProvider injectFirst>
      <SCThemeProvider theme={theme}>
        <Fragment>
          <CssBaseline />
          <GlobalStyle />
          {children}
        </Fragment>
      </SCThemeProvider>
    </StylesProvider>
  </MuiThemeProvider>
);

ThemeProvider.propTypes = {
  children: PropTypes.any,
};

export default ThemeProvider;
