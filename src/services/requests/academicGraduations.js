import api from '../api';

export const academicGraduationsRoutes = {
  academicGraduations: userId => `/workers/${userId}/academic-graduations`,
  academicGraduationsId: (userId, academicGraduationId) =>
    `/workers/${userId}/academic-graduations/${academicGraduationId}`,
};

const create = (userId, data) =>
  api.post(academicGraduationsRoutes.academicGraduations(userId), data);
const update = (userId, academicGraduationId, data) =>
  api.put(
    academicGraduationsRoutes.academicGraduationsId(
      userId,
      academicGraduationId,
    ),
    data,
  );
const getList = userId =>
  api.get(academicGraduationsRoutes.academicGraduations(userId));
const exclude = (userId, academicGraduationId) =>
  api.delete(
    academicGraduationsRoutes.academicGraduationsId(
      userId,
      academicGraduationId,
    ),
  );

const academicGraduationsApi = {
  create,
  update,
  getList,
  exclude,
};

export default academicGraduationsApi;
