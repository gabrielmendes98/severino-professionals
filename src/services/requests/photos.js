import api, { filesApi } from '../api';

export const photosRoutes = {
  photos: userId => `/workers/${userId}/photos`,
  photosId: (userId, photoId) => `/workers/${userId}/photos/${photoId}`,
};

const photosApi = {
  create: (userId, data) => filesApi.post(photosRoutes.photos(userId), data),
  list: userId => api.get(photosRoutes.photos(userId)),
  exclude: (userId, photoId) =>
    api.delete(photosRoutes.photosId(userId, photoId)),
};

export default photosApi;
