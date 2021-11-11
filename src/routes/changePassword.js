import { lazy } from 'react';
import Layout from 'components/Layout/Main';

const ChangePassword = lazy(() => import('pages/ChangePassword'));

const changePasswordRoutes = {
  main: '/change-password',
};

const changePassword = [
  {
    path: changePasswordRoutes.main,
    component: ChangePassword,
    layout: Layout,
    exact: true,
    isProtected: true,
  },
];

export { changePasswordRoutes };
export default changePassword;
