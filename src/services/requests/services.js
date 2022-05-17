import api from '../api';

export const servicesRoutes = {
  services: userId => `/workers/${userId}/services`,
  servicesId: (userId, serviceId) => `/workers/${userId}/services/${serviceId}`,
};

const servicesApi = {
  addToWorker: (userId, data) => api.post(servicesRoutes.skills(userId), data),
  list: userId => api.get(servicesRoutes.services(userId)),
  exclude: (userId, serviceId) =>
    api.delete(servicesRoutes.servicesId(userId, serviceId)),
};

export default servicesApi;
