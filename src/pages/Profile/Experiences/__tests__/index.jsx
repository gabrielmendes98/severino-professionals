import 'test-utils/mocks/material-ui/pickers';
import 'test-utils/mocks/material-ui/select';
import {
  renderWithRouter,
  screen,
  fireEvent,
  userEvent,
  waitFor,
  within,
  act,
} from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import getJobTypes from 'services/mocks/data/workers/getJobTypes';
import states from 'services/mocks/data/locations/states';
import cities from 'services/mocks/data/locations/cities';
import getExperiences from 'services/mocks/data/workers/getExperiences';
import experiencesApi from 'services/requests/experiences';
import deleteExperience from 'services/mocks/data/workers/deleteExperience';
import PAGE_URL from 'commons/constants/routes';
import { UserContext } from 'commons/contexts/User';
import Experiences from '..';
import * as utils from '../util';

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should fill data and call createExperience api on form submit', async () => {
  const addExperienceSpy = jest
    .spyOn(experiencesApi, 'create')
    .mockImplementation(() => Promise.resolve());
  jest.spyOn(utils, 'cancelEditing').mockImplementation(jest.fn);

  const postData = {
    role: 'Test Role',
    jobType: getJobTypes[0].id,
    company: 'Test Company',
    city: cities[0].id,
    state: states[1].id,
    startDate: '2020-10-31T21:00:00-03:00',
    endDate: '2021-10-31T21:00:00-03:00',
  };

  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Experiences
        name="experiences"
        title="Experiências Profissionais"
        expanded="experiences"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  userEvent.type(screen.getByLabelText(/^cargo$/i), postData.role);
  await waitFor(() => {
    userEvent.selectOptions(
      screen.getByLabelText(/^tipo de emprego$/i),
      postData.jobType,
    );
  });
  userEvent.type(screen.getByLabelText(/^empresa$/i), postData.company);
  await waitFor(() => {
    userEvent.selectOptions(screen.getByLabelText(/^estado$/i), postData.state);
  });
  await waitFor(() => {
    userEvent.selectOptions(screen.getByLabelText(/^cidade$/i), postData.city);
  });
  fireEvent.change(screen.getByLabelText(/^data de início$/i), {
    target: { value: postData.startDate },
  });
  fireEvent.change(screen.getByLabelText(/^data de término$/i), {
    target: { value: postData.endDate },
  });
  userEvent.click(screen.getByRole('button', { name: /adicionar/i }));

  jest
    .spyOn(utils, 'fetchExperiences')
    .mockImplementation(() => Promise.resolve([]));
  const cancelEditing = jest
    .spyOn(utils, 'cancelEditing')
    .mockImplementation(jest.fn);

  await waitFor(() => {
    expect(addExperienceSpy).toHaveBeenCalledTimes(1);
  });
  expect(addExperienceSpy).toHaveBeenCalledWith(mockedUser.id, postData);

  await waitFor(() => {
    expect(cancelEditing).toHaveBeenCalledTimes(1);
  });
});

it('should display experiences list', async () => {
  await act(async () => {
    renderWithRouter(
      <UserContext.Provider value={{ user: mockedUser }}>
        <Experiences
          name="experiences"
          title="Experiências Profissionais"
          expanded="experiences"
          handleChange={() => {}}
        />
      </UserContext.Provider>,
      { route: PAGE_URL.PROFILE },
    );
  });

  const experiencesList = within(screen.getByRole('list'));

  expect(
    await experiencesList.findByText(getExperiences[0].role),
  ).toBeInTheDocument();
  expect(
    experiencesList.getByText(
      `${getExperiences[0].company} - ${getExperiences[0].job.description}`,
    ),
  ).toBeInTheDocument();
  expect(
    experiencesList.getByText('09/2020 - 09/2021 (um ano)'),
  ).toBeInTheDocument();
  expect(
    experiencesList.getByText(
      `${getExperiences[0].city.name}, ${getExperiences[0].city.state.acronym}`,
    ),
  ).toBeInTheDocument();
});

it('should be able to delete experience and refresh experiences', async () => {
  await act(async () => {
    renderWithRouter(
      <UserContext.Provider value={{ user: mockedUser }}>
        <Experiences
          name="experiences"
          title="Experiências Profissionais"
          expanded="experiences"
          handleChange={() => {}}
        />
      </UserContext.Provider>,
      { route: PAGE_URL.PROFILE },
    );
  });

  const experiencesList = within(screen.getByRole('list'));
  const firstDeleteButton = await screen.findByTestId('delete-experience-0');

  const fetchExperiencesMock = jest
    .spyOn(utils, 'fetchExperiences')
    .mockReturnValueOnce(Promise.resolve(deleteExperience));
  const deleteExperienceMock = jest.spyOn(utils, 'removeExperience');

  userEvent.click(firstDeleteButton);
  userEvent.click(await screen.findByTestId('modal-confirm'));

  await waitFor(() => {
    expect(deleteExperienceMock).toHaveBeenCalledTimes(1);
    expect(fetchExperiencesMock).toHaveBeenCalledTimes(1);
    expect(
      experiencesList.queryByText(getExperiences[0].role),
    ).not.toBeInTheDocument();
  });
});

it('should fill form and change buttons when click on edit experience button', async () => {
  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Experiences
        name="experiences"
        title="Experiências Profissionais"
        expanded="experiences"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const experiencesList = within(screen.getByRole('list'));
  const firstEditButton = await experiencesList.findByTestId(
    'edit-experience-0',
  );

  userEvent.click(firstEditButton);

  await waitFor(() => {
    expect(screen.getByLabelText(/^cargo$/i)).toHaveValue(
      getExperiences[0].role,
    );
  });
  expect(screen.getByLabelText(/^tipo de emprego$/i)).toHaveValue(
    getExperiences[0].job.id,
  );
  expect(screen.getByLabelText(/^empresa$/i)).toHaveValue(
    getExperiences[0].company,
  );
  expect(screen.getByLabelText(/^estado$/i)).toHaveValue(
    getExperiences[0].city.state.id,
  );
  await waitFor(() => {
    expect(screen.getByLabelText(/^cidade$/i)).toHaveValue(
      getExperiences[0].city.id,
    );
  });
  expect(screen.getByLabelText(/^data de início$/i)).toHaveValue(
    getExperiences[0].startDate,
  );
  expect(screen.getByLabelText(/^data de término$/i)).toHaveValue(
    getExperiences[0].endDate,
  );
});

it('should be able to edit experience and save then clear form', async () => {
  const updateExperienceMock = jest
    .spyOn(experiencesApi, 'update')
    .mockImplementation(() => Promise.resolve());
  const cancelEditingMock = jest
    .spyOn(utils, 'cancelEditing')
    .mockImplementationOnce(() => Promise.resolve());
  const fetchExperiencesMock = jest.spyOn(utils, 'fetchExperiences');

  const {
    id,
    jobType,
    company,
    city,
    startDate,
    endDate,
    createdAt,
    updateAt,
  } = getExperiences[0];

  const expectedPayload = {
    id,
    jobType,
    company,
    city: city.id,
    state: city.state.id,
    startDate,
    endDate,
    createdAt,
    updateAt,
    role: 'Change role test',
  };

  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Experiences
        name="experiences"
        title="Experiências Profissionais"
        expanded="experiences"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const experiencesList = within(screen.getByRole('list'));
  const firstEditButton = await experiencesList.findByTestId(
    'edit-experience-0',
  );

  userEvent.click(firstEditButton);

  await waitFor(() => {
    expect(screen.getByLabelText(/^cargo$/i)).toHaveValue(
      getExperiences[0].role,
    );
  });

  userEvent.clear(screen.getByLabelText(/^cargo$/i));
  userEvent.type(screen.getByLabelText(/^cargo$/i), expectedPayload.role);

  userEvent.click(screen.getByRole('button', { name: /^salvar$/i }));

  await waitFor(() => {
    expect(updateExperienceMock).toHaveBeenCalledTimes(1);
  });
  expect(updateExperienceMock).toHaveBeenCalledWith(
    mockedUser.id,
    expectedPayload.id,
    expect.objectContaining({
      role: expectedPayload.role,
    }),
  );

  await waitFor(() => {
    expect(fetchExperiencesMock).toHaveBeenCalledTimes(2);
    expect(cancelEditingMock).toHaveBeenCalledTimes(1);
  });
});

it('should be able to cancel experience edit and cancel should clear form data', async () => {
  const cancelEditingMock = jest.spyOn(utils, 'cancelEditing');

  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Experiences
        name="experiences"
        title="Experiências Profissionais"
        expanded="experiences"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const experiencesList = within(screen.getByRole('list'));
  const firstEditButton = await experiencesList.findByTestId(
    'edit-experience-0',
  );

  userEvent.click(firstEditButton);

  await waitFor(() => {
    expect(screen.getByLabelText(/^cargo$/i)).toHaveValue(
      getExperiences[0].role,
    );
  });

  userEvent.click(screen.getByRole('button', { name: /^cancelar$/i }));

  expect(cancelEditingMock).toHaveBeenCalledTimes(1);

  expect(
    await screen.findByRole('button', { name: /^adicionar$/i }),
  ).toBeInTheDocument();

  expect(screen.getByLabelText(/^cargo$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^tipo de emprego$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^empresa$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^estado$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^cidade$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^data de início$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^data de término$/i)).toHaveValue('');
});

it('formatCompanyJobType should show just company when do not have job description ', () => {
  const formatCompanyJobType = jest.spyOn(utils, 'formatCompanyJobType');

  const experienceMock = {
    job: { description: 'Test Company' },
  };

  expect(formatCompanyJobType(experienceMock)).toBe(
    experienceMock.job.description,
  );
});
