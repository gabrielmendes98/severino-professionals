import { rest } from 'msw';
import { locationRoutes } from 'services/requests/locations';
import { mountIbgeApiUrl } from '../helpers/util';
import cities from '../data/ibge/cities';
import states from '../data/ibge/states';

const ibgeHandler = [
  rest.get(
    mountIbgeApiUrl(locationRoutes.states.replace('?orderBy=nome', '')),
    (req, res, ctx) => res(ctx.status(200), ctx.json(states)),
  ),

  rest.get(
    mountIbgeApiUrl(
      locationRoutes.citiesByState(':state').replace('?orderBy=nome', ''),
    ),
    (req, res, ctx) => res(ctx.status(200), ctx.json(cities)),
  ),
];

export default ibgeHandler;
