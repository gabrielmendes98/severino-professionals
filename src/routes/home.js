import PAGE_URL from 'commons/constants/routes';
import Home from 'pages/Home';
import Layout from 'components/Layout/Main';

const home = [
  {
    path: PAGE_URL.HOME,
    component: Home,
    layout: Layout,
    exact: true,
  },
];

export default home;
