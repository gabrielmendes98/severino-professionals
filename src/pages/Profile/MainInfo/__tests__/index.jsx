import 'test-utils/mocks/material-ui/select';
import { userEvent, screen, renderWithRouter, waitFor, act } from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import mockedApiUser from 'services/mocks/data/workers/getById';
import PAGE_URL from 'commons/constants/routes';
import { UserContext } from 'commons/contexts/User';
import { toast } from 'commons/utils/toast';
import MainInfo from '..';
import * as utils from '../util';

it('should get user info and set fields correctly', async () => {
  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <MainInfo
        name="main"
        title="Informações principais"
        expanded="main"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const parsedMockUser = utils.parseUserToForm(mockedApiUser);

  await waitFor(() =>
    expect(screen.getByLabelText('Nome', { exact: true })).toHaveValue(
      parsedMockUser.name,
    ),
  );

  expect(screen.getByLabelText(/sobrenome/i)).toHaveValue(
    parsedMockUser.lastName,
  );
  expect(screen.getByLabelText(/e-mail/i)).toHaveValue(parsedMockUser.email);
  expect(screen.getByLabelText(/nos conte um pouco sobre você/i)).toHaveValue(
    parsedMockUser.description,
  );
  expect(screen.getByLabelText(/^telefone$/i, { exact: true })).toHaveValue(
    parsedMockUser.phone,
  );
  expect(screen.getByLabelText(/estado/i)).toHaveValue(parsedMockUser.state);
  expect(screen.getByLabelText(/cidade/i)).toHaveValue(parsedMockUser.city);
});

it('should be able to edit and save', async () => {
  const saveUserDataMock = jest.spyOn(utils, 'saveUserData');
  const toastSpy = jest.spyOn(toast, 'success');

  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <MainInfo
        name="main"
        title="Informações principais"
        expanded="main"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const parsedMockUser = utils.parseUserToForm(mockedApiUser);

  await waitFor(() =>
    expect(screen.getByLabelText(/^nome$/i)).toHaveValue(parsedMockUser.name),
  );

  act(() => userEvent.click(screen.getByRole('button', { name: /editar/i })));
  const nameInput = screen.getByLabelText(/^nome$/i);

  expect(nameInput).not.toBeDisabled();

  userEvent.clear(nameInput);
  userEvent.type(nameInput, 'Testtest');
  parsedMockUser.name = 'Testtest';

  act(() => userEvent.click(screen.getByRole('button', { name: /salvar/i })));

  await waitFor(() => expect(toastSpy).toHaveBeenCalledTimes(1));
  expect(saveUserDataMock).toHaveBeenCalledTimes(1);
  expect(saveUserDataMock).toHaveBeenCalledWith(parsedMockUser, mockedUser.id);
});

it('should cancel editing and disable inputs when click on cancel button', async () => {
  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <MainInfo
        name="main"
        title="Informações principais"
        expanded="main"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const parsedMockUser = utils.parseUserToForm(mockedApiUser);

  await waitFor(() =>
    expect(screen.getByLabelText(/^nome$/i)).toHaveValue(parsedMockUser.name),
  );

  userEvent.click(screen.getByRole('button', { name: /editar/i }));
  const nameInput = screen.getByLabelText(/^nome$/i);
  expect(nameInput).not.toBeDisabled();
  userEvent.click(screen.getByRole('button', { name: /cancelar/i }));
  expect(nameInput).toBeDisabled();
});

it('should retrive cities when change state', async () => {
  const parseCitiesToSelectMock = jest.spyOn(utils, 'parseCityToSelect');
  renderWithRouter(
    <UserContext.Provider value={{ user: mockedUser }}>
      <MainInfo
        name="main"
        title="Informações principais"
        expanded="main"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  const parsedMockUser = utils.parseUserToForm(mockedApiUser);

  await waitFor(() =>
    expect(screen.getByLabelText(/estado/i)).toHaveValue(parsedMockUser.state),
  );

  userEvent.click(screen.getByRole('button', { name: /editar/i }));
  userEvent.selectOptions(screen.getByLabelText(/estado/i), 'SP');
  await waitFor(() => {
    expect(parseCitiesToSelectMock).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {
    expect(screen.getByLabelText(/estado/i)).toHaveValue('SP');
  });
});

it('should get initialValues for description if it comes null from api and remove avatarUrl', async () => {
  const parseUserToFormSpy = jest.spyOn(utils, 'parseUserToForm');
  renderWithRouter(
    <UserContext.Provider value={{ user: { id: 'nullDescriptionUser' } }}>
      <MainInfo
        name="main"
        title="Informações principais"
        expanded="main"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
    { route: PAGE_URL.PROFILE },
  );

  await waitFor(() => expect(parseUserToFormSpy).toHaveBeenCalled());

  expect(screen.getByLabelText(/nos conte um pouco sobre você/i)).toHaveValue(
    '',
  );
});
