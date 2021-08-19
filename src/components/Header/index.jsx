import { Link } from 'react-router-dom';
import { Container, Toolbar } from '@material-ui/core';
import AppBrand from 'components/AppBrand';
import Button from 'components/Button';
import { AppBar, Divider } from './style';

const Header = () => {
  const signed = false;
  const signOutUser = () => {};

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Container maxWidth="xl">
        <Toolbar>
          <AppBrand data-testid="brand" />
          <Divider />
          <Button
            color="inherit"
            component={Link}
            to={signed ? '/profile' : '/login'}
          >
            {signed ? 'Perfil' : 'Login'}
          </Button>

          {!signed && (
            <Button color="inherit" component={Link} to="/sign-up">
              Cadastre-se
            </Button>
          )}

          {signed && (
            <Button color="inherit" onClick={signOutUser}>
              Sair
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
