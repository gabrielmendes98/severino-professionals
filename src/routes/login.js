import Login from 'pages/Login';
import Layout from 'components/Layout/Main';

const loginRoutes = {
  main: '/login',
};

const login = [
  {
    path: loginRoutes.main,
    component: Login,
    layout: Layout,
    exact: true,
  },
];

export { loginRoutes };
export default login;
