import api, { filesApi } from '../api';

export const photosRoutes = {
  photos: userId => `/workers/${userId}/photos`,
  photosId: (userId, photoId) => `/workers/${userId}/photos/${photoId}`,
};

const create = (userId, data) =>
  filesApi.post(photosRoutes.photos(userId), data);
const getAll = userId => api.get(photosRoutes.photos(userId));
const exclude = (userId, photoId) =>
  api.delete(photosRoutes.photosId(userId, photoId));

const photosApi = {
  create,
  getAll,
  exclude,
};

export default photosApi;
