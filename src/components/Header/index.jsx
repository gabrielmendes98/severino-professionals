import { Link } from 'react-router-dom';
import { Container, Toolbar } from '@material-ui/core';
import PAGE_URL from 'commons/constants/routes';
import useUser from 'commons/contexts/User/useUser';
import AppBrand from 'components/AppBrand';
import Button from 'components/Button';
import { AppBar, Divider } from './style';

const Header = () => {
  const { signed, signOut } = useUser();

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar>
          <AppBrand data-testid="brand" />
          <Divider />
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to={signed ? PAGE_URL.PROFILE : PAGE_URL.LOGIN}
          >
            {signed ? 'Perfil' : 'Login'}
          </Button>

          {!signed && (
            <Button
              variant="text"
              color="inherit"
              component={Link}
              to={PAGE_URL.SIGN_UP}
            >
              Cadastre-se
            </Button>
          )}

          {signed && (
            <Button variant="text" color="inherit" onClick={signOut}>
              Sair
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
