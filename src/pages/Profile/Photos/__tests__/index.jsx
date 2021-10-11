import { render, screen, userEvent, waitFor } from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import photosApi from 'services/requests/photos';
import getPhotos from 'services/mocks/data/photos/getPhotos';
import { UserContext } from 'commons/contexts/User';
import Photos from '..';

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should upload file and call api', async () => {
  const photoCreate = jest
    .spyOn(photosApi, 'create')
    .mockImplementation(() => Promise.resolve());
  const getPhotosSpy = jest
    .spyOn(photosApi, 'getAll')
    .mockImplementation(() => Promise.resolve([]));
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });

  const postData = {
    file,
    title: 'Título de Teste',
  };

  const bodyFormData = new FormData();
  bodyFormData.append('file', postData.file);
  bodyFormData.append('title', postData.title);

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Photos
        name="photos"
        title="Fotos dos meus trabalhos"
        expanded="photos"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  userEvent.upload(screen.getByTestId('photo-file'), file);
  userEvent.type(screen.getByLabelText(/^título$/i), postData.title);
  userEvent.click(screen.getByRole('button', { name: /^adicionar$/i }));

  await waitFor(() => {
    expect(photoCreate).toHaveBeenCalledTimes(1);
  });
  expect(photoCreate).toHaveBeenCalledWith(mockedUser.id, bodyFormData);

  await waitFor(() => {
    expect(getPhotosSpy).toHaveBeenCalledTimes(2);
  });
});

it('should display photos and titles list', async () => {
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Photos
        name="photos"
        title="Fotos dos meus trabalhos"
        expanded="photos"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  expect(await screen.findByText(getPhotos[0].title)).toBeInTheDocument();
  expect(screen.getByAltText(getPhotos[0].title)).toBeInTheDocument();
  expect(screen.getByAltText(getPhotos[0].title)).toHaveAttribute(
    'src',
    getPhotos[0].url,
  );

  expect(screen.getByText(getPhotos[1].title)).toBeInTheDocument();
  expect(screen.getByAltText(getPhotos[1].title)).toBeInTheDocument();
  expect(screen.getByAltText(getPhotos[1].title)).toHaveAttribute(
    'src',
    getPhotos[1].url,
  );
});

it('should delete photo on button click and refresh list', async () => {
  const deletePhoto = jest
    .spyOn(photosApi, 'exclude')
    .mockImplementationOnce(() => Promise.resolve());

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Photos
        name="photos"
        title="Fotos dos meus trabalhos"
        expanded="photos"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  expect(await screen.findByText(getPhotos[0].title)).toBeInTheDocument();

  const getPhotosSpy = jest
    .spyOn(photosApi, 'getAll')
    .mockImplementationOnce(() => Promise.resolve([]));

  userEvent.click(screen.getByTestId('delete-photo-0'));

  await waitFor(() => {
    expect(deletePhoto).toHaveBeenCalledTimes(1);
  });
  expect(getPhotosSpy).toHaveBeenCalledTimes(1);
});

it('should show errors on form submit', async () => {
  jest
    .spyOn(photosApi, 'getAll')
    .mockImplementationOnce(() => Promise.resolve([]));

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Photos
        name="photos"
        title="Fotos dos meus trabalhos"
        expanded="photos"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  userEvent.click(screen.getByRole('button', { name: /^adicionar$/i }));

  expect(await screen.findByText(/^escolha uma foto$/i)).toBeInTheDocument();
});
