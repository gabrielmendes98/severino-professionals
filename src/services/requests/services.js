import api from '../api';

export const servicesRoutes = {
  services: userId => `/workers/${userId}/services`,
  servicesId: (userId, serviceId) => `/workers/${userId}/services/${serviceId}`,
  search: value => `/services?search=${value}`,
};

const servicesApi = {
  addToWorker: (userId, data) =>
    api.post(servicesRoutes.services(userId), data),
  list: userId => api.get(servicesRoutes.services(userId)),
  exclude: (userId, serviceId) =>
    api.delete(servicesRoutes.servicesId(userId, serviceId)),
  search: value => api.get(servicesRoutes.search(value)),
};

export default servicesApi;
