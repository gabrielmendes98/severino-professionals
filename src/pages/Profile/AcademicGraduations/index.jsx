import { useCallback, useEffect, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import { Form, Formik } from 'formik';
import academicGraduationsApi from 'services/requests/academicGraduations';
import degreeTypesApi from 'services/requests/degreeTypes';
import useUser from 'commons/contexts/User/useUser';
import { toast } from 'commons/utils/toast';
import Input from 'components/Form/Input';
import { Grid } from 'components/Styled';
import ItemList from 'components/ItemList';
import Button from 'components/Button';
import Select from 'components/Form/Select';
import withAccordion from 'components/Accordion/withAccordion';
import {
  cancelEditing,
  initialValues,
  parseAcademicGraduationToForm,
  parseDegreesToSelect,
  validations,
} from './util';
import AcademicGraduationTemplate from './AcademicGraduationTemplate';

const AcademicGraduations = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState(initialValues);
  const [degrees, setDegrees] = useState();
  const [editing, setEditing] = useState();
  const [academicGraduations, setAcademicGraduations] = useState([]);

  const getAcademicGraduations = useCallback(() => {
    academicGraduationsApi.list(user.id).then(setAcademicGraduations);
  }, [user.id]);

  const onSubmit = (values, { resetForm }) => {
    if (editing) {
      academicGraduationsApi.update(user.id, values.id, values).then(() => {
        toast.success('Formação acadêmica alterada com sucesso!');
        getAcademicGraduations();
        cancelEditing(resetForm, setFormData, setEditing);
      });

      return;
    }

    academicGraduationsApi.create(user.id, values).then(() => {
      toast.success('Formação acadêmica adicionada com sucesso!');
      getAcademicGraduations();
      cancelEditing(resetForm, setFormData, setEditing);
    });
  };

  const editAcademicGraduation = academicGraduation => {
    const parsedGraduation = parseAcademicGraduationToForm(academicGraduation);
    setFormData(parsedGraduation);
    setEditing(true);
  };

  const deleteAcademicGraduation = academicGraduationId =>
    academicGraduationsApi
      .exclude(user.id, academicGraduationId)
      .then(() => toast.success('Formação acadêmica removida com sucesso'))
      .then(getAcademicGraduations);

  useEffect(() => {
    getAcademicGraduations();
    degreeTypesApi.list().then(parseDegreesToSelect).then(setDegrees);
  }, [getAcademicGraduations]);

  return (
    <Grid container>
      <Formik
        initialValues={formData}
        validationSchema={validations}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ handleReset }) => (
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input name="institution" label="Instituição de ensino" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Select
                  options={degrees}
                  name="degree"
                  label="Tipo de formação"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Input name="studyArea" label="Área de estudo" />
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
          items={academicGraduations}
          deleteItem={deleteAcademicGraduation}
          editItem={editAcademicGraduation}
          id="academic-graduation"
          ItemTemplate={AcademicGraduationTemplate}
        />
      </Grid>
    </Grid>
  );
};

export default withAccordion(AcademicGraduations);
