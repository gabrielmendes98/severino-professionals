import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Loading from 'components/Loading';

const AppRoute = ({
  path,
  exact,
  component: Component,
  layout: Layout = 'div',
  ...routeProps
}) => (
  <Route
    path={path}
    exact={exact}
    render={props => (
      <Layout>
        <Suspense fallback={<Loading full />}>
          <Component {...props} {...routeProps} />
        </Suspense>
      </Layout>
    )}
  />
);

AppRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any.isRequired,
  layout: PropTypes.any,
};

export default AppRoute;
