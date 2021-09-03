import { Form, Formik } from 'formik';
import changePasswordDoodle from 'assets/doodles/change-password.svg';
import useUser from 'commons/contexts/User/useUser';
import Button from 'components/Button';
import { Grid } from 'components/Styled';
import Doodle from 'components/Doodle';
import Input from 'components/Form/Input';
import Text from 'components/Text';
import { initialValues, validations } from './util';
import { StyledGrid, Paper } from './style';

const ChangePassword = () => {
  const { changePassword } = useUser();

  const onSubmit = values =>
    changePassword({
      newPassword: values.newPassword,
      currentPassword: values.currentPassword,
    });

  return (
    <Grid container padding={{ bottom: 20 }}>
      <StyledGrid
        container
        item
        md={6}
        justifyContent="flex-end"
        padding={{ right: 15 }}
      >
        <Doodle size={40} src={changePasswordDoodle} />
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
              Mudar senha
            </Text>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validations}
            >
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Input
                      name="currentPassword"
                      label="Senha atual"
                      type="password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Input
                      name="newPassword"
                      label="Nova senha"
                      type="password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Input
                      name="confirmNewPassword"
                      label="Confirmar nova senha"
                      type="password"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" fullWidth size="large">
                      Confirmar
                    </Button>
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

export default ChangePassword;
