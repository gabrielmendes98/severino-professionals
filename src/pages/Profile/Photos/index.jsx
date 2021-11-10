import { useEffect, useRef, useState, useCallback } from 'react';
import { Form, Formik } from 'formik';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AddIcon from '@material-ui/icons/Add';
import photosApi from 'services/requests/photos';
import useUser from 'commons/contexts/User/useUser';
import { toast } from 'commons/utils/toast';
import withAccordion from 'components/Accordion/withAccordion';
import Input from 'components/Form/Input';
import { Grid } from 'components/Styled';
import Text from 'components/Text';
import Button from 'components/Button';
import ItemList from 'components/ItemList';
import { initialValues, validations } from './util';
import PhotoTemplate from './PhotoTemplate';

const Photos = () => {
  const { user } = useUser();
  const fileRef = useRef();
  const [photos, setPhotos] = useState([]);

  const onFileChange = (event, setFieldValue) => {
    setFieldValue('file', event.currentTarget.files[0]);
    event.target.value = '';
  };

  /* istanbul ignore next */
  const onClickUploadFile = () => {
    fileRef.current.click();
  };

  const getPhotos = useCallback(
    () => photosApi.list(user.id).then(setPhotos),
    [user.id],
  );

  const deletePhoto = photoId => {
    photosApi
      .exclude(user.id, photoId)
      .then(() => toast.success('Foto removida com sucesso!'))
      .then(getPhotos);
  };

  const onSubmit = (values, { resetForm }) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', values.file);
    bodyFormData.append('title', values.title);

    photosApi.create(user.id, bodyFormData).then(() => {
      toast.success('Trabalho adicionado com sucesso!');
      resetForm();
      getPhotos();
    });
  };

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  return (
    <Grid container>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, values, errors }) => (
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <input
                  type="file"
                  name="file"
                  ref={fileRef}
                  hidden
                  onChange={e => onFileChange(e, setFieldValue)}
                  id="photo-file"
                />
                <Button
                  startIcon={<CloudUploadIcon />}
                  size="large"
                  onClick={onClickUploadFile}
                >
                  Escolher foto
                </Button>

                {values.file && (
                  <Text display="inline" margin={{ left: 2 }}>
                    {values.file.name}
                  </Text>
                )}

                {errors.file && (
                  <Text margin={{ top: 1 }} color="red">
                    {errors.file}
                  </Text>
                )}
              </Grid>
              <Grid item xs={12}>
                <Input name="title" label="Título" />
              </Grid>
              <Grid container item justifyContent="flex-end">
                <Button type="submit" startIcon={<AddIcon />} size="large">
                  Adicionar
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <Grid container margin={{ top: 3 }}>
        <ItemList
          ItemTemplate={PhotoTemplate}
          deleteItem={deletePhoto}
          id="photo"
          items={photos}
        />
      </Grid>
    </Grid>
  );
};

export default withAccordion(Photos);
