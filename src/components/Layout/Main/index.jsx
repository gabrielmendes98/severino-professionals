import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Container } from './style';

const Layout = ({ children }) => (
  <>
    <Header />
    <Container>{children}</Container>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Layout;
