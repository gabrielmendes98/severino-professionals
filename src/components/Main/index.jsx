import { Switch } from 'react-router';
import routes from 'routes';
import AppRoute, { DefaultRoute } from './AppRoute';
import { MainContainer } from './style';

const Main = () => (
  <MainContainer>
    <Switch>
      {routes.map(route => (
        <AppRoute key={route.path} {...route} />
      ))}
      <DefaultRoute />
    </Switch>
  </MainContainer>
);

export default Main;
