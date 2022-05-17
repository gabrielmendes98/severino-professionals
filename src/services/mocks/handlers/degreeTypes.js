import { rest } from 'msw';
import { degreeTypesRoutes } from 'services/requests/degreeTypes';
import getDegreeTypes from '../data/getDegreeTypes';
import { mountApiUrl } from '../helpers/util';

const degreeTypesHandler = [
  rest.get(mountApiUrl(degreeTypesRoutes.degreeTypes), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getDegreeTypes)),
  ),
];

export default degreeTypesHandler;
