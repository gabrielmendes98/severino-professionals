import { rest } from 'msw';
import { IBGE_API_ROUTES } from 'services/routes';
import { mountIbgeApiUrl } from '../helpers/util';
import cities from '../data/ibge/cities';
import states from '../data/ibge/states';

const ibgeHandler = [
  rest.get(
    mountIbgeApiUrl(IBGE_API_ROUTES.STATES.replace('?orderBy=nome', '')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(states)),
  ),

  rest.get(
    mountIbgeApiUrl(
      IBGE_API_ROUTES.CITIES_BY_STATE(':id').replace('?orderBy=nome', ''),
    ),
    (req, res, ctx) => res(ctx.status(200), ctx.json(cities)),
  ),
];

export default ibgeHandler;
