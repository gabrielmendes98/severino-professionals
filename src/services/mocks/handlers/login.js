import { rest } from 'msw';
import { loginRoutes } from '../../requests/login';
import session from '../data/session';
import { mountApiUrl } from '../helpers/util';

const loginHandler = [
  rest.post(mountApiUrl(loginRoutes.login), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  ),
  rest.post(mountApiUrl(loginRoutes.oAuth), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  ),
];

export default loginHandler;
