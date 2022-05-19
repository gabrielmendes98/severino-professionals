import { useEffect, useState, useCallback } from 'react';
import { Form, Formik } from 'formik';
import AddIcon from '@material-ui/icons/Add';
import servicesApi from 'services/requests/services';
import useUser from 'commons/contexts/User/useUser';
import { toast } from 'commons/utils/toast';
import { parseToSelect } from 'commons/utils/parse';
import withAccordion from 'components/Accordion/withAccordion';
import { Grid } from 'components/Styled';
import Button from 'components/Button';
import ItemList from 'components/ItemList';
import Autocomplete from 'components/Form/Autocomplete';
import { initialValues, validations } from './util';
import ServiceTemplate from './ServiceTemplate';

const Services = () => {
  const { user } = useUser();
  const [services, setServices] = useState([]);
  const [serviceOptions, setServiceOptions] = useState([]);

  const onSearch = value => {
    servicesApi
      .search(value)
      .then(values => parseToSelect(values, 'serviceName', 'serviceId'))
      .then(setServiceOptions);
  };

  const getServices = useCallback(
    () => servicesApi.list(user.id).then(setServices),
    [user.id],
  );

  const deleteService = serviceId => {
    servicesApi
      .exclude(user.id, serviceId)
      .then(() => toast.success('Serviço removido com sucesso!'))
      .then(getServices);
  };

  const onSubmit = (values, { resetForm }) => {
    servicesApi.addToWorker(user.id, values).then(() => {
      toast.success('Serviço adicionado com sucesso!');
      resetForm();
      getServices();
    });
  };

  useEffect(() => {
    getServices();
  }, [getServices]);

  return (
    <Grid container>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        {({ values, errors }) => (
          <Form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div>
                  {values.serviceId}, {Object.keys(errors)}
                </div>

                <Autocomplete
                  name="serviceId"
                  label="Buscar serviço"
                  onChange={onSearch}
                  options={serviceOptions}
                  setOptions={setServiceOptions}
                />
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
          ItemTemplate={ServiceTemplate}
          deleteItem={deleteService}
          id="service"
          items={services}
        />
      </Grid>
    </Grid>
  );
};

export default withAccordion(Services);
