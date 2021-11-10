import SignUp from 'pages/SignUp';
import Layout from 'components/Layout/Main';

const signUpRoutes = {
  main: '/sign-up',
};

const signUp = [
  {
    path: signUpRoutes.main,
    component: SignUp,
    layout: Layout,
    exact: true,
  },
];

export { signUpRoutes };
export default signUp;
