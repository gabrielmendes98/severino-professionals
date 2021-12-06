import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Form, Formik } from 'formik';
import loginDoodle from 'assets/doodles/login.svg';
import useUser from 'commons/contexts/User/useUser';
import { O_AUTH_PROVIDERS } from 'commons/constants';
import { toast } from 'commons/utils/toast';
import { Grid } from 'components/Styled';
import Doodle from 'components/Doodle';
import Input from 'components/Form/Input';
import Text from 'components/Text';
import Button from 'components/Button';
import { getRedirectRoute, initialValues, validations, getToken } from './util';
import { StyledGrid, Paper, GoogleLogin } from './style';

const Login = ({ history, location }) => {
  const { login, oAuthLogin } = useUser();

  const onSuccessLogin = () => {
    toast.success('Bem-vindo(a) ao Severino!');
    history.push(getRedirectRoute(location));
  };

  const onSubmit = values => login(values).then(onSuccessLogin);

  const handleOAuthLogin = (response, provider) => {
    const token = getToken(response, provider);

    oAuthLogin(token, provider).then(onSuccessLogin);
  };

  const handleOAuthFailure = () =>
    toast.error('Erro com a autenticação, tente novamente');

  return (
    <Grid container padding={{ bottom: 20 }}>
      <StyledGrid
        container
        item
        md={6}
        justifyContent="flex-end"
        padding={{ right: 15 }}
      >
        <Doodle size={40} src={loginDoodle} />
      </StyledGrid>
      <StyledGrid container item md={6} justifyContent="flex-start">
        <Paper>
          <Grid item padding={{ top: 4, right: 4, bottom: 4, left: 4 }}>
            <Text
              size={1.2}
              color="secondary"
              weight="500"
              margin={{ bottom: 4 }}
            >
              Entrar
            </Text>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validations}
            >
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input name="email" label="E-mail" />
                  </Grid>

                  <Grid item xs={12}>
                    <Input name="password" label="Senha" type="password" />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" fullWidth size="large">
                      Entrar
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <GoogleLogin
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Entrar com Google"
                      onSuccess={response =>
                        handleOAuthLogin(response, O_AUTH_PROVIDERS.GOOGLE)
                      }
                      onFailure={handleOAuthFailure}
                      cookiePolicy={'single_host_origin'}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Grid>
        </Paper>
      </StyledGrid>
    </Grid>
  );
};

Login.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(Login);
