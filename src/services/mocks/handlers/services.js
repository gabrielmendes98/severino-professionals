import { rest } from 'msw';
import { servicesRoutes } from 'services/requests/services';
import list from '../data/services/list';
import search from '../data/services/search';
import { mountApiUrl } from '../helpers/util';

const servicesHandler = [
  rest.get(mountApiUrl(servicesRoutes.services(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(list)),
  ),
  rest.get(mountApiUrl(servicesRoutes.search), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(search)),
  ),
  rest.delete(
    mountApiUrl(servicesRoutes.servicesId(':userId', ':serviceId')),
    (req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
  rest.post(mountApiUrl(servicesRoutes.services(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
];

export default servicesHandler;
