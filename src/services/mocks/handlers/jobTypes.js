import { rest } from 'msw';
import { mountApiUrl } from '../helpers/util';
import getJobTypes from '../data/workers/getJobTypes';
import { jobTypesRoutes } from '../../requests/jobTypes';

const jobTypesHandler = [
  rest.get(mountApiUrl(jobTypesRoutes.jobTypes), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getJobTypes)),
  ),
];

export default jobTypesHandler;
