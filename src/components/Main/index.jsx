import PropTypes from 'prop-types';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContainer, MainContent } from './style';

const Main = ({ children }) => (
  <MainContainer>
    <Header />
    <MainContent>{children}</MainContent>
    <Footer />
  </MainContainer>
);

Main.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Main;
