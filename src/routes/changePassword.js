import { lazy } from 'react';
import PAGE_URL from 'commons/constants/routes';
import Layout from 'components/Layout/Main';

const ChangePassword = lazy(() => import('pages/ChangePassword'));

const changePassword = [
  {
    path: PAGE_URL.CHANGE_PASSWORD,
    component: ChangePassword,
    layout: Layout,
    exact: true,
    isProtected: true,
  },
];

export default changePassword;
