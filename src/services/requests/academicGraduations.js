import api from '../api';

export const academicGraduationsRoutes = {
  academicGraduations: userId => `/workers/${userId}/academic-graduations`,
  academicGraduationsId: (userId, academicGraduationId) =>
    `/workers/${userId}/academic-graduations/${academicGraduationId}`,
};

const academicGraduationsApi = {
  create: (userId, data) =>
    api.post(academicGraduationsRoutes.academicGraduations(userId), data),
  update: (userId, academicGraduationId, data) =>
    api.put(
      academicGraduationsRoutes.academicGraduationsId(
        userId,
        academicGraduationId,
      ),
      data,
    ),
  list: userId =>
    api.get(academicGraduationsRoutes.academicGraduations(userId)),
  exclude: (userId, academicGraduationId) =>
    api.delete(
      academicGraduationsRoutes.academicGraduationsId(
        userId,
        academicGraduationId,
      ),
    ),
};

export default academicGraduationsApi;
