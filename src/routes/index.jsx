import { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PAGE_URL from 'commons/constants/routes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Loading from 'components/Loading';
import Main from 'components/Main';

const Routes = () => (
  <BrowserRouter>
    <Main>
      <Suspense fallback={<Loading fullScreen />}>
        <Switch>
          <Route path={PAGE_URL.HOME} component={Home} exact />

          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Main>
  </BrowserRouter>
);

export default Routes;
