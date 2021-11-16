/* eslint-disable func-names */
import '@testing-library/jest-dom';
import 'jest-styled-components';
import 'test-utils/mocks/loading';
import { server } from 'services/mocks/server';

// To fix react-slick "matchMedia not present"
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

window.URL.createObjectURL = function () {};

// mock http requests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
