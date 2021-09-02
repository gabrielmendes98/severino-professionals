import { rest } from 'msw';
import API_ROUTES from 'services/routes';
import { mountApiUrl } from '../helpers/util';
import session from '../data/session';
import postWorkers from '../data/workers/post';
import ibgeHandler from './ibge';

export const handlers = [
  rest.post(mountApiUrl(API_ROUTES.LOGIN), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  ),
  ...ibgeHandler,
  rest.post(mountApiUrl(API_ROUTES.WORKERS), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(postWorkers)),
  ),
];
