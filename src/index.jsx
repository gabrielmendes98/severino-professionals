import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_MOCK_ON) {
  const { worker } = require('./services/mocks/browser');
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
