import { lazy } from 'react';
import Layout from 'components/Layout/Main';

const NotFound = lazy(() => import('pages/NotFound'));

const notFoundRoutes = {
  main: '/not-found',
};

const notFound = [
  {
    path: notFoundRoutes.main,
    component: NotFound,
    layout: Layout,
    exact: true,
  },
];

export { notFoundRoutes };
export default notFound;
