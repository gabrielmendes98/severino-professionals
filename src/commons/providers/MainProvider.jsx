import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { ToastContainer } from 'react-toastify';
import { DATE_LOCALE } from 'commons/constants';
import ThemeProvider from './ThemeProvider';
import 'moment/locale/pt-br';

moment.locale(DATE_LOCALE);

const MainProvider = ({ children }) => (
  <ThemeProvider>
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={DATE_LOCALE}
    >
      {children}
      <ToastContainer position="bottom-right" />
    </MuiPickersUtilsProvider>
  </ThemeProvider>
);

MainProvider.propTypes = {
  children: PropTypes.any,
};

export default MainProvider;
