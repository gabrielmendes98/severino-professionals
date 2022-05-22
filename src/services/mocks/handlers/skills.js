import { rest } from 'msw';
import { skillsRoutes } from 'services/requests/skills';
import getSkills from '../data/skills/list';
import { mountApiUrl } from '../helpers/util';

const skillsHandler = [
  rest.get(mountApiUrl(skillsRoutes.skills(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getSkills)),
  ),
  rest.post(mountApiUrl(skillsRoutes.skills(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  rest.delete(
    mountApiUrl(skillsRoutes.skillsId(':userId', ':photoId')),
    (req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
];

export default skillsHandler;
