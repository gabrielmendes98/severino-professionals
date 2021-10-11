import { filesApi } from '../api';

export const photosRoutes = {
  photos: userId => `/workers/${userId}/photos`,
};

const create = (userId, data) =>
  filesApi.post(photosRoutes.photos(userId), data);

const photosApi = {
  create,
};

export default photosApi;
