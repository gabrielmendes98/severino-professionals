import changePassword from './changePassword';
import home from './home';
import login from './login';
import notFound from './notFound';
import profile from './profile';
import signUp from './signUp';

const routes = [
  ...changePassword,
  ...home,
  ...login,
  ...notFound,
  ...profile,
  ...signUp,
];

export default routes;
