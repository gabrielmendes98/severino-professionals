import api from '../api';

export const academicGraduations = {
  academicGraduations: userId => `/workers/${userId}/academic-graduations`,
  academicGraduationsId: (userId, academicGraduationId) =>
    `/workers/${userId}/academic-graduations/${academicGraduationId}`,
};

const create = (userId, data) =>
  api.post(academicGraduations.academicGraduations(userId), data);
const update = (userId, academicGraduationId, data) =>
  api.put(
    academicGraduations.academicGraduationsId(userId, academicGraduationId),
    data,
  );
const getList = userId =>
  api.get(academicGraduations.academicGraduations(userId));
const exclude = (userId, academicGraduationId) =>
  api.delete(
    academicGraduations.academicGraduationsId(userId, academicGraduationId),
  );

const academicGraduationsApi = {
  create,
  update,
  getList,
  exclude,
};

export default academicGraduationsApi;
