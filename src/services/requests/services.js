import api from '../api';

export const servicesRoutes = {
  services: userId => `/workers/${userId}/services`,
  servicesId: (userId, serviceId) => `/workers/${userId}/services/${serviceId}`,
  search: '/services',
};

const servicesApi = {
  addToWorker: (userId, data) =>
    api.post(servicesRoutes.services(userId), data),
  list: userId => api.get(servicesRoutes.services(userId)),
  exclude: (userId, serviceId) =>
    api.delete(servicesRoutes.servicesId(userId, serviceId)),
  search: value =>
    api.get(servicesRoutes.search, { params: { search: value } }),
};

export default servicesApi;
