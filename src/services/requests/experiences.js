import api from '../api';

export const experiencesRoutes = {
  experiences: userId => `/workers/${userId}/experiences`,
  experiencesId: (userId, experienceId) =>
    `/workers/${userId}/experiences/${experienceId}`,
};

const create = (userId, data) =>
  api.post(experiencesRoutes.experiences(userId), data);
const update = (userId, experienceId, data) =>
  api.put(experiencesRoutes.experiencesId(userId, experienceId), data);
const getList = userId => api.get(experiencesRoutes.experiences(userId));
const exclude = (userId, experienceId) =>
  api.delete(experiencesRoutes.experiencesId(userId, experienceId));

const experiencesApi = {
  create,
  update,
  getList,
  exclude,
};

export default experiencesApi;
