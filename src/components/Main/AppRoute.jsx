import { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import useUser from 'commons/contexts/User/useUser';
import NotFound from 'pages/NotFound';
import Loading from 'components/Loading';
import RedirectToLogin from './RedirectToLogin';

const DefaultRoute = () => <Route component={NotFound} />;

const AppRoute = ({
  path,
  exact,
  component: Component,
  computedMatch,
  layout: Layout = 'div',
  isProtected,
  ...otherProps
}) => {
  const userContextData = useUser();
  const { signed } = userContextData;

  const routeProps = {
    ...otherProps,
    ...userContextData,
  };

  if (isProtected && !signed) {
    return <RedirectToLogin path={computedMatch.url} />;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={props => (
        <Layout id="layout">
          <Suspense fallback={<Loading full />}>
            <Component {...props} {...routeProps} />
          </Suspense>
        </Layout>
      )}
    />
  );
};

AppRoute.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.any.isRequired,
  layout: PropTypes.any,
  computedMatch: PropTypes.object,
  isProtected: PropTypes.bool,
};

export { DefaultRoute };
export default AppRoute;
