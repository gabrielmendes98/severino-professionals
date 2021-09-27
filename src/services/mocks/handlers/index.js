import { rest } from 'msw';
import API_ROUTES from 'services/routes';
import { mountApiUrl } from '../helpers/util';
import session from '../data/session';
import postWorkers from '../data/workers/post';
import putWorkers from '../data/workers/put';
import user from '../data/workers/getById';
import userNullDescription from '../data/workers/userNullDescription';
import getExperiences from '../data/workers/getExperiences';
import getJobTypes from '../data/workers/getJobTypes';
import ibgeHandler from './ibge';

export const handlers = [
  ...ibgeHandler,
  rest.post(mountApiUrl(API_ROUTES.LOGIN), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  ),
  rest.post(mountApiUrl(API_ROUTES.WORKERS), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(postWorkers)),
  ),
  rest.put(mountApiUrl(API_ROUTES.WORKER_ID(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(putWorkers)),
  ),
  rest.get(
    mountApiUrl(API_ROUTES.WORKER_ID('nullDescriptionUser')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(userNullDescription)),
  ),
  rest.get(mountApiUrl(API_ROUTES.WORKER_ID(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(user)),
  ),
  rest.get(mountApiUrl(API_ROUTES.EXPERIENCES(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getExperiences)),
  ),
  rest.post(mountApiUrl(API_ROUTES.EXPERIENCES(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getExperiences)),
  ),
  rest.get(mountApiUrl(API_ROUTES.JOB_TYPES), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getJobTypes)),
  ),
];
