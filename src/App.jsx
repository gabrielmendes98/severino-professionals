import { BrowserRouter } from 'react-router-dom';
import MainProvider from 'commons/providers/MainProvider';
import UserProvider from 'commons/contexts/User';
import Main from 'components/Main';

const App = () => (
  <BrowserRouter>
    <MainProvider>
      <UserProvider>
        <Main />
      </UserProvider>
    </MainProvider>
  </BrowserRouter>
);

export default App;
