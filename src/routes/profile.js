import { lazy } from 'react';
import Layout from 'components/Layout/Main';

const Profile = lazy(() => import('pages/Profile'));

const profileRoutes = {
  main: '/profile',
};

const profile = [
  {
    path: profileRoutes.main,
    component: Profile,
    layout: Layout,
    exact: true,
    isProtected: true,
  },
];

export { profileRoutes };
export default profile;
