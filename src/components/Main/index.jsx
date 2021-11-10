import { Switch } from 'react-router';
import routes from 'routes';
import AppRoute from './AppRoute';
import { MainContainer } from './style';

const Main = () => (
  <MainContainer>
    <Switch>
      {routes.map(route => (
        <AppRoute key={route.path} {...route} />
      ))}
    </Switch>
  </MainContainer>
);

export default Main;
