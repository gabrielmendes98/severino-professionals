import Profile from 'pages/Profile';
import Layout from 'components/Layout/Main';

const profileRoutes = {
  main: '/profile',
};

const profile = [
  {
    path: profileRoutes.main,
    component: Profile,
    layout: Layout,
    exact: true,
  },
];

export { profileRoutes };
export default profile;
