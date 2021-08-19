/* eslint-disable func-names */
import '@testing-library/jest-dom';
import 'jest-styled-components';

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
