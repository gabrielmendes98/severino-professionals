import api, { filesApi } from '../api';

export const workersRoutes = {
  workers: '/workers',
  workersId: id => `/workers/${id}`,
  avatar: id => `/workers/${id}/avatar`,
};

const workersApi = {
  create: data => api.post(workersRoutes.workers, data),
  update: (id, data) => api.put(workersRoutes.workersId(id), data),
  get: id => api.get(workersRoutes.workersId(id)),
  updateAvatar: (id, data) => filesApi.put(workersRoutes.avatar(id), data),
};

export default workersApi;
