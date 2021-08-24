import { rest } from 'msw';
import session from '../data/session';

export const handlers = [
  rest.post('/workers/session', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(session)),
  ),
];
