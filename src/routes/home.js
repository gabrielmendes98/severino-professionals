import Home from 'pages/Home';
import Layout from 'components/Layout/Main';

const homeRoutes = {
  main: '/',
};

const home = [
  {
    path: homeRoutes.main,
    component: Home,
    layout: Layout,
    exact: true,
  },
];

export { homeRoutes };
export default home;
