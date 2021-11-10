import ChangePassword from 'pages/ChangePassword';
import Layout from 'components/Layout/Main';

const changePasswordRoutes = {
  main: '/change-password',
};

const changePassword = [
  {
    path: changePasswordRoutes.main,
    component: ChangePassword,
    layout: Layout,
    exact: true,
  },
];

export { changePasswordRoutes };
export default changePassword;
