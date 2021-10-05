import { useCallback, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import api, { ibgeApi } from 'services/api';
import API_ROUTES, { IBGE_API_ROUTES } from 'services/routes';
import { toast } from 'commons/utils/toast';
import useUser from 'commons/contexts/User/useUser';
import withAccordion from 'components/Accordion/withAccordion';
import Button from 'components/Button';
import Select from 'components/Form/Select';
import Input from 'components/Form/Input';
import MonthYearPicker from 'components/Form/DatePicker/MonthYearPicker';
import { Grid } from 'components/Styled';
import {
  initialValues,
  parseCityToSelect,
  parseStateToSelect,
  validations,
  parseJobTypes,
  parseExperienceToFrom,
  addExperience,
  fetchExperiences,
  cancelEditing,
  removeExperience,
  updateExperience,
} from './util';
import ExperiencesList from './ExperiencesList';

const Experiences = () => {
  const { user } = useUser();
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState(initialValues);
  const [jobTypes, setJobTypes] = useState();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState();
  const [editing, setEditing] = useState(false);

  const onChangeState = (event, setFieldValue) => {
    const { value: state, name } = event.target;
    ibgeApi
      .get(IBGE_API_ROUTES.CITIES_BY_STATE(state))
      .then(parseCityToSelect)
      .then(setCities);
    setFieldValue(name, state);
  };

  const getExperiences = useCallback(
    () => fetchExperiences(user.id).then(setData),
    [user.id],
  );

  const editExperience = experience => {
    ibgeApi
      .get(IBGE_API_ROUTES.CITIES_BY_STATE(experience.state))
      .then(parseCityToSelect)
      .then(setCities)
      .then(() => parseExperienceToFrom(experience))
      .then(setFormData)
      .then(() => setEditing(true));
  };

  const deleteExperience = experienceId =>
    removeExperience(user.id, experienceId)
      .then(() => toast.success('Experiência removida com sucesso'))
      .then(getExperiences);

  const onSubmit = (values, { resetForm }) => {
    if (editing) {
      updateExperience(user.id, values)
        .then(() => toast.success('Experiência atualizada com sucesso'))
        .then(getExperiences)
        .then(() => cancelEditing(resetForm, setFormData, setEditing));

      return;
    }

    addExperience(user.id, values)
      .then(() => toast.success('Experiência adicionada com sucesso'))
      .then(getExperiences)
      .then(() => cancelEditing(resetForm, setFormData, setEditing));
  };

  useEffect(() => {
    getExperiences();

    api.get(API_ROUTES.JOB_TYPES).then(parseJobTypes).then(setJobTypes);

    ibgeApi
      .get(IBGE_API_ROUTES.STATES)
      .then(parseStateToSelect)
      .then(setStates);
  }, [getExperiences]);

  return (
    <Grid container>
      <Formik
        initialValues={formData}
        validationSchema={validations}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue, handleReset }) => (
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Input name="role" label="Cargo" />
              </Grid>
              <Grid item xs={4}>
                <Select
                  name="jobType"
                  label="Tipo de emprego"
                  options={jobTypes}
                />
              </Grid>

              <Grid item xs={4}>
                <Input name="company" label="Empresa" />
              </Grid>

              <Grid item xs={4}>
                <Select
                  name="state"
                  label="Estado"
                  options={states}
                  onChange={event => onChangeState(event, setFieldValue)}
                />
              </Grid>

              <Grid item xs={4}>
                <Select
                  name="city"
                  label="Cidade"
                  options={cities}
                  emptyStateMessage="Selecione um estado primeiro"
                />
              </Grid>

              <Grid item xs={4}></Grid>

              <Grid item xs={4}>
                <MonthYearPicker name="startDate" label="Data de início" />
              </Grid>

              <Grid item xs={4}>
                <MonthYearPicker name="endDate" label="Data de término" />
              </Grid>

              <Grid container item justifyContent="flex-end">
                {editing ? (
                  <>
                    <Button
                      key="cancel"
                      size="large"
                      color="red"
                      startIcon={<BlockIcon />}
                      margin={{ right: 2 }}
                      onClick={() =>
                        cancelEditing(handleReset, setFormData, setEditing)
                      }
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
                    key="add-experience"
                    type="submit"
                    startIcon={<AddIcon />}
                    size="large"
                  >
                    Adicionar
                  </Button>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Grid container margin={{ top: 3 }}>
        <ExperiencesList
          experiences={data}
          deleteExperience={deleteExperience}
          editExperience={editExperience}
        />
      </Grid>
    </Grid>
  );
};

export default withAccordion(Experiences);
