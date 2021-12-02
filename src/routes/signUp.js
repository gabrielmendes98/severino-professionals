import PAGE_URL from 'commons/constants/routes';
import SignUp from 'pages/SignUp';
import Layout from 'components/Layout/Main';

const signUp = [
  {
    path: PAGE_URL.SIGN_UP,
    component: SignUp,
    layout: Layout,
    exact: true,
  },
];

export default signUp;
