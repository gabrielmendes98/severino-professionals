import { render, userEvent, screen, waitFor, within } from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import servicesSearchList from 'services/mocks/data/services/search';
import servicesList from 'services/mocks/data/services/list';
import servicesApi from 'services/requests/services';
import { UserContext } from 'commons/contexts/User';
import Services from '../index';

jest.mock('lodash.debounce', () => fn => {
  fn.cancel = jest.fn();
  return fn;
});

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should be able to add service', async () => {
  const addService = jest.spyOn(servicesApi, 'addToWorker');
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Services
        name="services"
        title="Serviços que presto"
        expanded="services"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  const selectedService = servicesSearchList[0];

  userEvent.type(screen.getByLabelText(/buscar serviço/i), 'limp');
  userEvent.click(
    within(await screen.findByRole('listbox')).getByText(
      selectedService.serviceName,
    ),
  );
  userEvent.click(screen.getByRole('button', { name: /adicionar/i }));

  const getServices = jest
    .spyOn(servicesApi, 'list')
    .mockImplementation(() => Promise.resolve([]));

  await waitFor(() => {
    expect(addService).toHaveBeenCalledTimes(1);
  });
  expect(addService).toHaveBeenCalledWith(mockedUser.id, {
    serviceId: selectedService.serviceId,
  });

  await waitFor(() => {
    expect(getServices).toHaveBeenCalledTimes(1);
  });
});

it('should list services', async () => {
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Services
        name="services"
        title="Serviços que presto"
        expanded="services"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  expect(await screen.findByText(servicesList[0].name)).toBeInTheDocument();
  expect(screen.getByText(servicesList[1].name)).toBeInTheDocument();
});

it('should be able to delete services', async () => {
  const deleteService = jest.spyOn(servicesApi, 'exclude');

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Services
        name="services"
        title="Serviços que presto"
        expanded="services"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  const deleteServiceButton = await screen.findByTestId('delete-service-0');
  expect(deleteServiceButton).toBeInTheDocument();

  const list = jest
    .spyOn(servicesApi, 'list')
    .mockImplementationOnce(() => Promise.resolve([]));

  userEvent.click(deleteServiceButton);
  userEvent.click(await screen.findByTestId('modal-confirm'));

  expect(deleteService).toHaveBeenCalledTimes(1);
  expect(deleteService).toHaveBeenCalledWith(mockedUser.id, servicesList[0].id);

  await waitFor(() => {
    expect(list).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {});
});
