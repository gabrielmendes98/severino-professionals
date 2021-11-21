import { render, screen, userEvent, waitFor } from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import photosApi from 'services/requests/photos';
import { UserContext } from 'commons/contexts/User';
import Profile from '..';

it('should show all profile sections', () => {
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Profile />
    </UserContext.Provider>,
  );

  expect(screen.getByText(/informações principais/i)).toBeInTheDocument();
  expect(screen.getByText(/experiências profissionais/i)).toBeInTheDocument();
  expect(screen.getByText(/fotos dos meus trabalhos/i)).toBeInTheDocument();
  expect(screen.getByText(/formação acadêmica/i)).toBeInTheDocument();
  expect(screen.getByText(/habilidades/i)).toBeInTheDocument();
});

it('should expand accordion on click', async () => {
  jest.spyOn(photosApi, 'list').mockImplementation(() => Promise.resolve([]));

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Profile />
    </UserContext.Provider>,
  );

  userEvent.click(screen.getByText(/fotos dos meus trabalhos/i));

  await waitFor(() => {
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
  });
});

it('should retract accordion on click', async () => {
  jest.spyOn(photosApi, 'list').mockImplementation(() => Promise.resolve([]));

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Profile />
    </UserContext.Provider>,
  );

  userEvent.click(screen.getByText(/fotos dos meus trabalhos/i));
  userEvent.click(screen.getByText(/fotos dos meus trabalhos/i));

  await waitFor(() => {
    expect(screen.queryByLabelText(/título/i)).not.toBeInTheDocument();
  });
});
