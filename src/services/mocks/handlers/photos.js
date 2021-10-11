import { rest } from 'msw';
import { photosRoutes } from 'services/requests/photos';
import getPhotos from '../data/photos/getPhotos';
import { mountApiUrl } from '../helpers/util';

const photosHandler = [
  rest.get(mountApiUrl(photosRoutes.photos(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getPhotos)),
  ),
  rest.post(mountApiUrl(photosRoutes.photos(':id')), (req, res, ctx) =>
    res(ctx.status(200), ctx.json({})),
  ),
  rest.delete(
    mountApiUrl(photosRoutes.photosId(':userId', ':photoId')),
    (req, res, ctx) => res(ctx.status(200), ctx.json({})),
  ),
];

export default photosHandler;
