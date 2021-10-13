import { rest } from 'msw';
import { degreeTypesRoutes } from 'services/requests/degreeTypes';
import { mountApiUrl } from '../helpers/util';
import session from '../data/session';
import postWorkers from '../data/workers/post';
import putWorkers from '../data/workers/put';
import user from '../data/workers/getById';
import userNullDescription from '../data/workers/userNullDescription';
import getExperiences from '../data/workers/getExperiences';
import getJobTypes from '../data/workers/getJobTypes';
import deleteExperience from '../data/workers/deleteExperience';
import { loginRoutes } from '../../requests/login';
import { workersRoutes } from '../../requests/workers';
import { experiencesRoutes } from '../../requests/experiences';
import { jobTypesRoutes } from '../../requests/jobTypes';
import getDegreeTypes from '../data/getDegreeTypes';
import ibgeHandler from './ibge';
import photosHandler from './photos';
import academicGraduationsHandler from './academicGraduations';

export const handlers = [
  ...ibgeHandler,
  ...photosHandler,
  ...academicGraduationsHandler,
  rest.post(mountApiUrl(loginRoutes.login), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  ),
  rest.post(mountApiUrl(workersRoutes.workers), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(postWorkers)),
  ),
  rest.put(mountApiUrl(workersRoutes.workersId(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(putWorkers)),
  ),
  rest.get(
    mountApiUrl(workersRoutes.workersId('nullDescriptionUser')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(userNullDescription)),
  ),
  rest.get(mountApiUrl(workersRoutes.workersId(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(user)),
  ),
  rest.get(mountApiUrl(experiencesRoutes.experiences(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getExperiences)),
  ),
  rest.post(
    mountApiUrl(experiencesRoutes.experiences(':id')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(getExperiences)),
  ),
  rest.get(mountApiUrl(jobTypesRoutes.jobTypes), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getJobTypes)),
  ),
  rest.get(mountApiUrl(degreeTypesRoutes.degreeTypes), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getDegreeTypes)),
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
