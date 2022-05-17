import { rest } from 'msw';
import getExperiences from '../data/workers/getExperiences';
import deleteExperience from '../data/workers/deleteExperience';
import { experiencesRoutes } from '../../requests/experiences';
import { mountApiUrl } from '../helpers/util';

const experiencesHandler = [
  rest.get(mountApiUrl(experiencesRoutes.experiences(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getExperiences)),
  ),
  rest.post(
    mountApiUrl(experiencesRoutes.experiences(':id')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(getExperiences)),
  ),
  rest.delete(
    mountApiUrl(experiencesRoutes.experiencesId(':userId', ':experienceId')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(deleteExperience)),
  ),
  rest.put(
    mountApiUrl(experiencesRoutes.experiencesId(':userId', ':experienceId')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(getExperiences)),
  ),
];

export default experiencesHandler;
