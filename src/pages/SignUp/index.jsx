import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Form, Formik } from 'formik';
import ibgeApi from 'services/requests/ibge';
import signUpDoodle from 'assets/doodles/sign-up.svg';
import PAGE_URL from 'commons/constants/routes';
import useUser from 'commons/contexts/User/useUser';
import { Grid } from 'components/Styled';
import Doodle from 'components/Doodle';
import Button from 'components/Button';
import Input from 'components/Form/Input';
import Select from 'components/Form/Select';
import Checkbox from 'components/Form/CheckBox';
import Text from 'components/Text';
import {
  initialValues,
  parseCityToSelect,
  parseStateToSelect,
  validations,
  parseDataToService,
} from './util';
import { StyledGrid, Paper } from './style';

const SignUp = ({ history }) => {
  const { signUp } = useUser();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState();

  const onSubmit = values => {
    const data = parseDataToService(values);
    signUp(data).then(() => history.push(PAGE_URL.PROFILE));
  };

  const onChangeState = (event, setFieldValue) => {
    const { value: state, name } = event.target;
    ibgeApi.getCitiesByState(state).then(parseCityToSelect).then(setCities);
    setFieldValue(name, state);
  };

  useEffect(() => {
    ibgeApi.getStates().then(parseStateToSelect).then(setStates);
  }, []);

  return (
    <Grid container padding={{ bottom: 20 }}>
      <StyledGrid
        container
        item
        md={6}
        justifyContent="flex-end"
        padding={{ right: 15 }}
      >
        <Doodle size={40} src={signUpDoodle} />
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
              Seja um profissional do Severino
            </Text>

            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validations}
            >
              {({ setFieldValue }) => (
                <Form noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Input name="email" label="E-mail" required />
                    </Grid>

                    <Grid item xs={6}>
                      <Input name="name" label="Nome" required />
                    </Grid>

                    <Grid item xs={6}>
                      <Input name="lastName" label="Sobrenome" required />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        name="phone"
                        label="Celular com Whatsapp, de preferência"
                        mask="phone"
                        required
                      />
                    </Grid>

                    <Grid container item xs={12} alignItems="center">
                      <Checkbox
                        name="hasWhatsapp"
                        label="Este telefone tem Whatsapp?"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Select
                        name="state"
                        label="Estado"
                        options={states}
                        onChange={event => onChangeState(event, setFieldValue)}
                        required
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Select
                        name="city"
                        label="Cidade"
                        options={cities}
                        emptyStateMessage="Selecione um estado primeiro"
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        name="password"
                        label="Senha"
                        type="password"
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        name="confirmPassword"
                        label="Confirmar senha"
                        type="password"
                        required
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button type="submit" size="large" fullWidth>
                        Finalizar
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Paper>
      </StyledGrid>
    </Grid>
  );
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignUp);
