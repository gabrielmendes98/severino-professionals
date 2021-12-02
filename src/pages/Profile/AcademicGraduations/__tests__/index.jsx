import 'test-utils/mocks/material-ui/select';
import { render, screen, userEvent, waitFor } from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import getAcademicGraduations from 'services/mocks/data/academicGraduations/getAcademicGraduations';
import academicGraduationsApi from 'services/requests/academicGraduations';
import degreeTypesApi from 'services/requests/degreeTypes';
import getDegreeTypes from 'services/mocks/data/getDegreeTypes';
import { UserContext } from 'commons/contexts/User';
import * as utils from '../util';
import AcademicGraduations from '..';

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should show academic graduation list', async () => {
  jest
    .spyOn(degreeTypesApi, 'list')
    .mockImplementation(() => Promise.resolve());
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <AcademicGraduations
        name="academicGraduation"
        title="Formação Acadêmica"
        expanded="academicGraduation"
        handleChange={jest.fn}
      />
    </UserContext.Provider>,
  );

  expect(
    await screen.findByText(getAcademicGraduations[0].institution),
  ).toBeInTheDocument();
  expect(
    screen.getByText(getAcademicGraduations[0].degree.description),
  ).toBeInTheDocument();
  expect(
    screen.getByText(getAcademicGraduations[0].studyArea),
  ).toBeInTheDocument();
  expect(
    screen.getByText(getAcademicGraduations[1].institution),
  ).toBeInTheDocument();
  expect(
    screen.getByText(getAcademicGraduations[1].degree.description),
  ).toBeInTheDocument();
});

it('should be able to add academic graduation', async () => {
  const parseDegreesToSelect = jest.spyOn(utils, 'parseDegreesToSelect');
  const createAcademicGraduation = jest
    .spyOn(academicGraduationsApi, 'create')
    .mockImplementationOnce(() => Promise.resolve());
  const getAcademicGraduationsSpy = jest
    .spyOn(academicGraduationsApi, 'list')
    .mockImplementationOnce(() => Promise.resolve([]));

  const postData = {
    institution: 'Test institution',
    degree: getDegreeTypes[0].id,
    studyArea: 'Test study area',
  };

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <AcademicGraduations
        name="academicGraduation"
        title="Formação Acadêmica"
        expanded="academicGraduation"
        handleChange={jest.fn}
      />
    </UserContext.Provider>,
  );

  userEvent.type(
    screen.getByLabelText(/^instituição de ensino$/i),
    postData.institution,
  );

  await waitFor(() => {
    expect(parseDegreesToSelect).toHaveBeenCalled();
  });

  userEvent.selectOptions(
    screen.getByLabelText(/^tipo de formação$/i),
    postData.degree,
  );
  userEvent.type(
    screen.getByLabelText(/^área de estudo$/i),
    postData.studyArea,
  );

  const cancelEditing = jest
    .spyOn(utils, 'cancelEditing')
    .mockImplementation(jest.fn);

  userEvent.click(screen.getByRole('button', { name: /^adicionar$/i }));

  await waitFor(() => {
    expect(createAcademicGraduation).toHaveBeenCalledTimes(1);
  });
  expect(createAcademicGraduation).toHaveBeenCalledWith(
    mockedUser.id,
    postData,
  );

  await waitFor(() => {
    expect(getAcademicGraduationsSpy).toHaveBeenCalledTimes(2);
  });
  expect(cancelEditing).toHaveBeenCalledTimes(1);
});

it('should be able to edit', async () => {
  const updateAcademicGraduation = jest
    .spyOn(academicGraduationsApi, 'update')
    .mockImplementationOnce(() => Promise.resolve());

  const postData = {
    id: getAcademicGraduations[0].id,
    institution: 'Update institution',
    degree: getAcademicGraduations[0].degreeId,
    studyArea: getAcademicGraduations[0].studyArea,
  };

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <AcademicGraduations
        name="academicGraduation"
        title="Formação Acadêmica"
        expanded="academicGraduation"
        handleChange={jest.fn}
      />
    </UserContext.Provider>,
  );

  expect(
    await screen.findByTestId('edit-academic-graduation-0'),
  ).toBeInTheDocument();

  userEvent.click(screen.getByTestId('edit-academic-graduation-0'));

  const institutionInput = screen.getByLabelText(/^instituição de ensino$/i);
  userEvent.clear(institutionInput);
  userEvent.type(institutionInput, postData.institution);

  const getAcademicGraduationsSpy = jest
    .spyOn(academicGraduationsApi, 'list')
    .mockImplementation(() => Promise.resolve([]));
  const cancelEditing = jest
    .spyOn(utils, 'cancelEditing')
    .mockImplementation(jest.fn);

  userEvent.click(screen.getByRole('button', { name: /^salvar$/i }));

  await waitFor(() => {
    expect(updateAcademicGraduation).toHaveBeenCalledTimes(1);
  });
  expect(updateAcademicGraduation).toHaveBeenCalledWith(
    mockedUser.id,
    postData.id,
    postData,
  );

  await waitFor(() => {
    expect(getAcademicGraduationsSpy).toHaveBeenCalledTimes(1);
  });
  expect(cancelEditing).toHaveBeenCalledTimes(1);
});

it('should be able to delete', async () => {
  const excludeAcademicGraduation = jest
    .spyOn(academicGraduationsApi, 'exclude')
    .mockImplementationOnce(() => Promise.resolve());

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <AcademicGraduations
        name="academicGraduation"
        title="Formação Acadêmica"
        expanded="academicGraduation"
        handleChange={jest.fn}
      />
    </UserContext.Provider>,
  );

  expect(
    await screen.findByTestId('delete-academic-graduation-0'),
  ).toBeInTheDocument();

  const getAcademicGraduationsSpy = jest
    .spyOn(academicGraduationsApi, 'list')
    .mockImplementation(() => Promise.resolve([]));

  userEvent.click(screen.getByTestId('delete-academic-graduation-0'));

  await waitFor(() => {
    expect(excludeAcademicGraduation).toHaveBeenCalledTimes(1);
  });
  expect(excludeAcademicGraduation).toHaveBeenCalledWith(
    mockedUser.id,
    getAcademicGraduations[0].id,
  );

  await waitFor(() => {
    expect(getAcademicGraduationsSpy).toHaveBeenCalledTimes(1);
  });
});

it('should be able to cancel edition', async () => {
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <AcademicGraduations
        name="academicGraduation"
        title="Formação Acadêmica"
        expanded="academicGraduation"
        handleChange={jest.fn}
      />
    </UserContext.Provider>,
  );

  expect(
    await screen.findByTestId('edit-academic-graduation-0'),
  ).toBeInTheDocument();

  userEvent.click(screen.getByTestId('edit-academic-graduation-0'));

  userEvent.click(screen.getByRole('button', { name: /^cancelar$/i }));

  expect(
    screen.getByRole('button', { name: /^adicionar$/i }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/^instituição de ensino$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^tipo de formação$/i)).toHaveValue('');
  expect(screen.getByLabelText(/^área de estudo$/i)).toHaveValue('');
});
