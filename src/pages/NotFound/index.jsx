import { Link } from 'react-router-dom';
import { homeRoutes } from 'routes/home';
import notFoundDoodle from 'assets/doodles/not-found.svg';
import Button from 'components/Button';
import Text from 'components/Text';
import { Container } from './style';

const NotFound = () => (
  <Container>
    <Text variant="h4" color="secondary">
      Página não encontrada 😥
    </Text>
    <img src={notFoundDoodle} width={400} height={400} alt="Not Found Doodle" />
    <Link to={homeRoutes.main}>
      <Button size="large">Voltar</Button>
    </Link>
  </Container>
);

export default NotFound;
