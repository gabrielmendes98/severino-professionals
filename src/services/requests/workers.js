import api from '../api';

export const workersRoutes = {
  workers: '/workers',
  workersId: id => `/workers/${id}`,
};

const create = data => api.post(workersRoutes.workers, data);
const update = (id, data) => api.put(workersRoutes.workersId(id), data);
const getById = id => api.get(workersRoutes.workersId(id));

const workersApi = {
  create,
  update,
  getById,
};

export default workersApi;
