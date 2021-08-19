import PropTypes from 'prop-types';
import Header from 'components/Header';
import { MainContainer, MainContent } from './style';

const Main = ({ children }) => (
  <MainContainer>
    <Header />
    <MainContent>{children}</MainContent>
  </MainContainer>
);

Main.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Main;
