import { rest } from 'msw';
import { academicGraduationsRoutes } from 'services/requests/academicGraduations';
import getAcademicGraduations from '../data/academicGraduations/getAcademicGraduations';
import { mountApiUrl } from '../helpers/util';

const academicGraduationsHandler = [
  rest.get(
    mountApiUrl(academicGraduationsRoutes.academicGraduations(':id')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(getAcademicGraduations)),
  ),
  rest.post(
    mountApiUrl(academicGraduationsRoutes.academicGraduations(':id')),
    (req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
  rest.delete(
    mountApiUrl(
      academicGraduationsRoutes.academicGraduationsId(
        ':userId',
        ':academicGraduationId',
      ),
    ),
    (req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
  rest.put(
    mountApiUrl(
      academicGraduationsRoutes.academicGraduationsId(
        ':userId',
        ':academicGraduationId',
      ),
    ),
    (req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
];

export default academicGraduationsHandler;
