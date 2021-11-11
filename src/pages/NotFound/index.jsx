import { Link } from 'react-router-dom';
import notFoundDoodle from 'assets/doodles/not-found.svg';
import PAGE_URL from 'commons/constants/routes';
import Button from 'components/Button';
import Text from 'components/Text';
import { Container } from './style';

const NotFound = () => (
  <Container>
    <Text variant="h4" color="secondary">
      Página não encontrada 😥
    </Text>
    <img src={notFoundDoodle} width={400} height={400} alt="Not Found Doodle" />
    <Link to={PAGE_URL.HOME}>
      <Button size="large">Voltar</Button>
    </Link>
  </Container>
);

export default NotFound;
