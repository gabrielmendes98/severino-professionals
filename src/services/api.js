import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const responseHandler = response => response.data;

const errorHandler = error => Promise.reject(error);

api.interceptors.response.use(
  response => responseHandler(response),
  error => errorHandler(error),
);

export default api;
