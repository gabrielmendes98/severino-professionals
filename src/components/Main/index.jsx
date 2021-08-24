import PropTypes from 'prop-types';
import UserProvider from 'commons/contexts/User';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContainer, MainContent } from './style';

const Main = ({ children }) => (
  <MainContainer>
    <UserProvider>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
    </UserProvider>
  </MainContainer>
);

Main.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Main;
