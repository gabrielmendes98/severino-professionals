import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ThemeProvider from './ThemeProvider';

const MainProvider = ({ children }) => (
  <ThemeProvider>
    {children}
    <ToastContainer position="bottom-right" />
  </ThemeProvider>
);

MainProvider.propTypes = {
  children: PropTypes.any,
};

export default MainProvider;
