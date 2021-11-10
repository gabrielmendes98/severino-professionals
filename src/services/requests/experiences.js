import api from '../api';

export const experiencesRoutes = {
  experiences: userId => `/workers/${userId}/experiences`,
  experiencesId: (userId, experienceId) =>
    `/workers/${userId}/experiences/${experienceId}`,
};

const experiencesApi = {
  create: (userId, data) =>
    api.post(experiencesRoutes.experiences(userId), data),
  update: (userId, experienceId, data) =>
    api.put(experiencesRoutes.experiencesId(userId, experienceId), data),
  list: userId => api.get(experiencesRoutes.experiences(userId)),
  exclude: (userId, experienceId) =>
    api.delete(experiencesRoutes.experiencesId(userId, experienceId)),
};

export default experiencesApi;
