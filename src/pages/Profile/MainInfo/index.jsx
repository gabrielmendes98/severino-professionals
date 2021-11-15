import { useState, useEffect, useRef } from 'react';
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
import { Avatar } from './style';

const MainInfo = () => {
  const { user } = useUser();
  const fileRef = useRef();
  const [data, setData] = useState(initialValues);
  const [avatar, setAvatar] = useState(initialValues);
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

  const cancelAvatarUpdate = () => {
    setAvatar(init => ({ ...init, editing: false, preview: null }));
  };

  const onSubmit = values => {
    saveUserData(values, user.id).then(() => {
      toast.success(SUCCESS_OPERATION_MESSAGE);
      setEditing(false);
    });
  };

  const onFileChange = e => {
    setAvatar(init => ({
      ...init,
      preview: URL.createObjectURL(e.target.files[0]),
      file: e.currentTarget.files[0],
      editing: true,
    }));
    e.target.value = '';
  };

  const updateAvatar = () => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', avatar.file);
    workersApi.updateAvatar(user.id, bodyFormData).then(({ avatarUrl }) => {
      toast.success('Foto atualizada com sucesso!');
      setAvatar({
        url: avatarUrl,
        file: undefined,
        editing: false,
      });
    });
  };

  useEffect(() => {
    Promise.all([workersApi.get(user.id), ibgeApi.getStates()]).then(
      ([responseWorker, responseStates]) => {
        setStates(parseStateToSelect(responseStates));
        ibgeApi
          .getCitiesByState(responseWorker.state)
          .then(parseCityToSelect)
          .then(setCities)
          .then(() => parseUserToForm(responseWorker))
          .then(response => {
            setData(response.userData);
            setAvatar(response.avatar);
          });
      },
    );
  }, [user.id]);

  return (
    <Grid container spacing={3}>
      <Grid container item xs={12} alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            alt="Foto de perfil"
            src={avatar && (avatar.preview || avatar.url)}
          >
            {data.name.substr(0, 2).toUpperCase()}
          </Avatar>
        </Grid>

        <input
          type="file"
          name="file"
          ref={fileRef}
          hidden
          onChange={onFileChange}
          id="photo-file"
        />
        <Grid item>
          {avatar?.editing ? (
            <>
              <Button
                key="cancel-avatar-update"
                color="red"
                startIcon={<BlockIcon />}
                margin={{ right: 2 }}
                onClick={cancelAvatarUpdate}
              >
                Cancelar
              </Button>

              <Button
                key="save-avatar"
                startIcon={<SaveIcon />}
                onClick={updateAvatar}
              >
                Salvar
              </Button>
            </>
          ) : (
            /* istanbul ignore next */
            <Button key="change-avatar" onClick={() => fileRef.current.click()}>
              Alterar Foto
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Formik
          initialValues={data}
          validationSchema={validations}
          enableReinitialize
          onSubmit={onSubmit}
        >
          {({ setFieldValue, handleReset }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Input name="name" label="Nome" disabled={!editing} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Input
                    name="lastName"
                    label="Sobrenome"
                    disabled={!editing}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Input name="email" label="E-mail" disabled={!editing} />
                </Grid>

                <Grid item xs={12} lg={12}>
                  <Input
                    name="description"
                    label="Nos conte um pouco sobre você"
                    disabled={!editing}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Input name="phone" label="Telefone" disabled={!editing} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Select
                    name="state"
                    label="Estado"
                    options={states}
                    onChange={event => onChangeState(event, setFieldValue)}
                    disabled={!editing}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Select
                    name="city"
                    label="Cidade"
                    options={cities}
                    emptyStateMessage="Selecione um estado primeiro"
                    disabled={!editing}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
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
      </Grid>
    </Grid>
  );
};

export default withAccordion(MainInfo);
