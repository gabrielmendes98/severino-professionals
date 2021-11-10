import { useCallback, useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import jobTypesApi from 'services/requests/jobTypes';
import experiencesApi from 'services/requests/experiences';
import ibgeApi from 'services/requests/ibge';
import { toast } from 'commons/utils/toast';
import useUser from 'commons/contexts/User/useUser';
import ItemList from 'components/ItemList';
import withAccordion from 'components/Accordion/withAccordion';
import Button from 'components/Button';
import Select from 'components/Form/Select';
import Input from 'components/Form/Input';
import MonthYearPicker from 'components/Form/DatePicker/MonthYearPicker';
import { Grid } from 'components/Styled';
import ExperienceTemplate from './ExperienceTemplate';
import {
  initialValues,
  parseCityToSelect,
  parseStateToSelect,
  validations,
  parseJobTypes,
  parseExperienceToFrom,
  fetchExperiences,
  cancelEditing,
  removeExperience,
} from './util';
import { BreakLine } from './style';

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
    ibgeApi.getCitiesByState(state).then(parseCityToSelect).then(setCities);
    setFieldValue(name, state);
  };

  const getExperiences = useCallback(
    () => fetchExperiences(user.id).then(setData),
    [user.id],
  );

  const editExperience = experience => {
    ibgeApi
      .getCitiesByState(experience.state)
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
      experiencesApi
        .update(user.id, values.id, values)
        .then(() => toast.success('Experiência atualizada com sucesso'))
        .then(getExperiences)
        .then(() => cancelEditing(resetForm, setFormData, setEditing));

      return;
    }

    experiencesApi
      .create(user.id, values)
      .then(() => toast.success('Experiência adicionada com sucesso'))
      .then(getExperiences)
      .then(() => cancelEditing(resetForm, setFormData, setEditing));
  };

  useEffect(() => {
    getExperiences();

    jobTypesApi.list().then(parseJobTypes).then(setJobTypes);

    ibgeApi.getStates().then(parseStateToSelect).then(setStates);
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
              <Grid item xs={12} md={4}>
                <Input name="role" label="Cargo" />
              </Grid>
              <Grid item xs={12} md={4}>
                <Select
                  name="jobType"
                  label="Tipo de emprego"
                  options={jobTypes}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Input name="company" label="Empresa" />
              </Grid>

              <Grid item xs={12} md={4}>
                <Select
                  name="state"
                  label="Estado"
                  options={states}
                  onChange={event => onChangeState(event, setFieldValue)}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Select
                  name="city"
                  label="Cidade"
                  options={cities}
                  emptyStateMessage="Selecione um estado primeiro"
                />
              </Grid>

              <Grid item xs={12} md={4} component={BreakLine}></Grid>

              <Grid item xs={12} md={4}>
                <MonthYearPicker name="startDate" label="Data de início" />
              </Grid>

              <Grid item xs={12} md={4}>
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
        <ItemList
          items={data}
          deleteItem={deleteExperience}
          editItem={editExperience}
          id="experience"
          ItemTemplate={ExperienceTemplate}
        />
      </Grid>
    </Grid>
  );
};

export default withAccordion(Experiences);
