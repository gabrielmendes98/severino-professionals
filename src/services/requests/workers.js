import api from '../api';

export const workersRoutes = {
  workers: '/workers',
  workersId: id => `/workers/${id}`,
};

const workersApi = {
  create: data => api.post(workersRoutes.workers, data),
  update: (id, data) => api.put(workersRoutes.workersId(id), data),
  get: id => api.get(workersRoutes.workersId(id)),
};

export default workersApi;
