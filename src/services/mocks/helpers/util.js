const isTest = process.env.NODE_ENV === 'test';
const testApiPath = 'http://localhost';

export const mountApiUrl = path =>
  isTest ? `${testApiPath}${path}` : `${process.env.REACT_APP_API_URL}${path}`;
export const mountIbgeApiUrl = path =>
  isTest
    ? `${testApiPath}${path}`
    : `${process.env.REACT_APP_IBGE_API_URL}${path}`;
