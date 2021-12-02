import { lazy } from 'react';
import PAGE_URL from 'commons/constants/routes';
import Layout from 'components/Layout/Main';

const Profile = lazy(() => import('pages/Profile'));

const profile = [
  {
    path: PAGE_URL.PROFILE,
    component: Profile,
    layout: Layout,
    exact: true,
    isProtected: true,
  },
];

export default profile;
