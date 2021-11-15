import { lazy } from 'react';

const NotFound = lazy(() => import('pages/NotFound'));

const notFoundRoutes = {
  main: '/not-found',
};

const notFound = [
  {
    path: notFoundRoutes.main,
    component: NotFound,
    exact: true,
  },
];

export { notFoundRoutes };
export default notFound;
