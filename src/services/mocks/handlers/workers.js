import { rest } from 'msw';
import postWorkers from '../data/workers/post';
import putWorkers from '../data/workers/put';
import user from '../data/workers/getById';
import userNullDescription from '../data/workers/userNullDescription';
import { workersRoutes } from '../../requests/workers';
import updateAvatar from '../data/workers/updateAvatar';
import { mountApiUrl } from '../helpers/util';

const workersHandler = [
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
  rest.put(mountApiUrl(workersRoutes.avatar(':userId')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(updateAvatar)),
  ),
];

export default workersHandler;
