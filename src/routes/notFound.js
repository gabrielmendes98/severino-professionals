import NotFound from 'pages/NotFound';
import Layout from 'components/Layout/Main';

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
