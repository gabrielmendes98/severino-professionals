import api from '../api';

export const skillsRoutes = {
  skills: userId => `/workers/${userId}/skills`,
  skillsId: (userId, skillsId) => `/workers/${userId}/skills/${skillsId}`,
};

const skillsApi = {
  create: (userId, data) => api.post(skillsRoutes.skills(userId), data),
  list: userId => api.get(skillsRoutes.skills(userId)),
  exclude: (userId, skillsId) =>
    api.delete(skillsRoutes.skillsId(userId, skillsId)),
};

export default skillsApi;
