import { useEffect, useState, useCallback } from 'react';
import { Form, Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import skillsApi from 'services/requests/skills';
import useUser from 'commons/contexts/User/useUser';
import { toast } from 'commons/utils/toast';
import withAccordion from 'components/Accordion/withAccordion';
import Input from 'components/Form/Input';
import { Grid } from 'components/Styled';
import Button from 'components/Button';
import ItemList from 'components/ItemList';
import { initialValues, validations } from './util';
import SkillTemplate from './SkillTemplate';

const Skills = () => {
  const { user } = useUser();
  const [skills, setSkills] = useState([]);

  const getSkills = useCallback(
    () => skillsApi.getAll(user.id).then(setSkills),
    [user.id],
  );

  const deleteSkill = photoId => {
    skillsApi
      .exclude(user.id, photoId)
      .then(() => toast.success('Habilidade removida com sucesso!'))
      .then(getSkills);
  };

  const onSubmit = (values, { resetForm }) => {
    skillsApi.create(user.id, values).then(() => {
      toast.success('Habilidade adicionada com sucesso!');
      resetForm();
      getSkills();
    });
  };

  useEffect(() => {
    getSkills();
  }, [getSkills]);

  return (
    <Grid container>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        <Form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Input
                name="name"
                label="Habilidade. Ex: Proatividade, esforçado (a)"
              />
            </Grid>
            <Grid container item justifyContent="flex-end">
              <Button type="submit" startIcon={<AddIcon />} size="large">
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>

      <Grid container margin={{ top: 3 }}>
        <ItemList
          ItemTemplate={SkillTemplate}
          deleteItem={deleteSkill}
          id="skill"
          items={skills}
        />
      </Grid>
    </Grid>
  );
};

export default withAccordion(Skills);
