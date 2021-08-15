import PropTypes from 'prop-types';

import ThemeProvider from './ThemeProvider';

const MainProvider = ({ children }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

MainProvider.propTypes = {
  children: PropTypes.any,
};

export default MainProvider;
