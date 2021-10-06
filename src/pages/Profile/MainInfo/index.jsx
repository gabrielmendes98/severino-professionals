import { useState, useEffect } from 'react';
import { Form, Formik } from 'formik';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import ibgeApi from 'services/requests/ibge';
import workersApi from 'services/requests/workers';
import { SUCCESS_OPERATION_MESSAGE } from 'commons/constants';
import { toast } from 'commons/utils/toast';
import useUser from 'commons/contexts/User/useUser';
import withAccordion from 'components/Accordion/withAccordion';
import { Grid } from 'components/Styled';
import Input from 'components/Form/Input';
import Checkbox from 'components/Form/CheckBox';
import Button from 'components/Button';
import Select from 'components/Form/Select';
import {
  parseCityToSelect,
  parseStateToSelect,
  initialValues,
  validations,
  parseUserToForm,
  saveUserData,
} from './util';

const MainInfo = () => {
  const { user } = useUser();
  const [data, setData] = useState(initialValues);
  const [editing, setEditing] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState();

  const onChangeState = (event, setFieldValue) => {
    const { value: state, name } = event.target;
    ibgeApi.getCitiesByState(state).then(parseCityToSelect).then(setCities);
    setFieldValue(name, state);
  };

  const enableEditing = () => setEditing(true);
  const cancelEditing = handleReset => {
    handleReset();
    setEditing(false);
  };

  const onSubmit = values => {
    saveUserData(values, user.id).then(() => {
      toast.success(SUCCESS_OPERATION_MESSAGE);
      setEditing(false);
    });
  };

  useEffect(() => {
    Promise.all([workersApi.getById(user.id), ibgeApi.getStates()]).then(
      ([responseWorker, responseStates]) => {
        setStates(parseStateToSelect(responseStates));
        ibgeApi
          .getCitiesByState(responseWorker.state)
          .then(parseCityToSelect)
          .then(setCities)
          .then(() => parseUserToForm(responseWorker))
          .then(setData);
      },
    );
  }, [user.id]);

  return (
    <Formik
      initialValues={data}
      validationSchema={validations}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ setFieldValue, handleReset }) => (
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid item md={12} lg={4}>
              <Input name="name" label="Nome" disabled={!editing} />
            </Grid>

            <Grid item md={12} lg={4}>
              <Input name="lastName" label="Sobrenome" disabled={!editing} />
            </Grid>

            <Grid item md={12} lg={4}>
              <Input name="email" label="E-mail" disabled={!editing} />
            </Grid>

            <Grid item md={12} lg={12}>
              <Input
                name="description"
                label="Nos conte um pouco sobre você"
                disabled={!editing}
              />
            </Grid>

            <Grid item md={12} lg={4}>
              <Input name="phone" label="Telefone" disabled={!editing} />
            </Grid>

            <Grid item md={12} lg={4}>
              <Select
                name="state"
                label="Estado"
                options={states}
                onChange={event => onChangeState(event, setFieldValue)}
                disabled={!editing}
              />
            </Grid>

            <Grid item xs={4}>
              <Select
                name="city"
                label="Cidade"
                options={cities}
                emptyStateMessage="Selecione um estado primeiro"
                disabled={!editing}
              />
            </Grid>

            <Grid item xs={12}>
              <Checkbox
                name="hasWhatsapp"
                label="Este telefone tem Whatsapp?"
                disabled={!editing}
              />
            </Grid>

            <Grid container item xs={12} justifyContent="flex-end">
              {editing ? (
                <>
                  <Button
                    key="cancel"
                    size="large"
                    color="red"
                    startIcon={<BlockIcon />}
                    margin={{ right: 2 }}
                    onClick={() => cancelEditing(handleReset)}
                  >
                    Cancelar
                  </Button>

                  <Button
                    key="save"
                    type="submit"
                    size="large"
                    startIcon={<SaveIcon />}
                  >
                    Salvar
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<EditIcon />}
                  onClick={enableEditing}
                  key="edit"
                >
                  Editar
                </Button>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default withAccordion(MainInfo);
