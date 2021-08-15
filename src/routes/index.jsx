import PAGE_URL from 'commons/constants/routes';
import Home from 'pages/Home';
import Loading from 'components/Loading';

const { Suspense } = require('react');
const { BrowserRouter, Switch, Route } = require('react-router-dom');

const Routes = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading fullScreen />}>
      <Switch>
        <Route path={PAGE_URL.HOME} component={Home} exact />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default Routes;
