import { lazy } from 'react';
import PAGE_URL from 'commons/constants/routes';

const NotFound = lazy(() => import('pages/NotFound'));

const notFound = [
  {
    path: PAGE_URL.NOT_FOUND,
    component: NotFound,
    exact: true,
  },
];

export default notFound;
