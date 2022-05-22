import { render, userEvent, screen, waitFor } from 'test-utils';
import mockedUser from 'test-utils/mockedUser';
import skillsApi from 'services/requests/skills';
import getSkills from 'services/mocks/data/skills/list';
import { UserContext } from 'commons/contexts/User';
import Skills from '..';

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should add skill', async () => {
  const addSkill = jest.spyOn(skillsApi, 'create');

  const postData = {
    name: 'Proativo',
  };

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Skills
        name="skills"
        title="Habilidades"
        expanded="skills"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  userEvent.type(screen.getByLabelText(/^habilidade. ex:/i), postData.name);

  const getSkillsSpy = jest
    .spyOn(skillsApi, 'list')
    .mockImplementation(() => Promise.resolve([]));

  userEvent.click(screen.getByRole('button', { name: /^adicionar$/i }));

  await waitFor(() => {
    expect(addSkill).toHaveBeenCalledTimes(1);
  });
  expect(addSkill).toHaveBeenCalledWith(mockedUser.id, postData);

  await waitFor(() => {
    expect(getSkillsSpy).toHaveBeenCalledTimes(1);
  });
});

it('should list skills', async () => {
  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Skills
        name="skills"
        title="Habilidades"
        expanded="skills"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  expect(await screen.findByText(getSkills[0].name)).toBeInTheDocument();
  expect(screen.getByText(getSkills[1].name)).toBeInTheDocument();
});

it('should delete skill', async () => {
  const deleteSkill = jest.spyOn(skillsApi, 'exclude');

  render(
    <UserContext.Provider value={{ user: mockedUser }}>
      <Skills
        name="skills"
        title="Habilidades"
        expanded="skills"
        handleChange={() => {}}
      />
    </UserContext.Provider>,
  );

  expect(await screen.findByTestId('delete-skill-0')).toBeInTheDocument();

  const list = jest
    .spyOn(skillsApi, 'list')
    .mockImplementationOnce(() => Promise.resolve([]));

  userEvent.click(screen.getByTestId('delete-skill-0'));
  userEvent.click(await screen.findByTestId('modal-confirm'));

  expect(deleteSkill).toHaveBeenCalledTimes(1);
  expect(deleteSkill).toHaveBeenCalledWith(mockedUser.id, getSkills[0].id);

  await waitFor(() => {
    expect(list).toHaveBeenCalledTimes(1);
  });

  await waitFor(() => {});
});
