import PAGE_URL from 'commons/constants/routes';
import Login from 'pages/Login';
import Layout from 'components/Layout/Main';

const login = [
  {
    path: PAGE_URL.LOGIN,
    component: Login,
    layout: Layout,
    exact: true,
  },
];

export default login;
