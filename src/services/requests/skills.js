import api from '../api';

export const skillsRoutes = {
  skills: userId => `/workers/${userId}/skills`,
  skillsId: (userId, skillsId) => `/workers/${userId}/skills/${skillsId}`,
};

const create = (userId, data) => api.post(skillsRoutes.skills(userId), data);
const getAll = userId => api.get(skillsRoutes.skills(userId));
const exclude = (userId, skillsId) =>
  api.delete(skillsRoutes.skillsId(userId, skillsId));

const skillsApi = {
  create,
  getAll,
  exclude,
};

export default skillsApi;
