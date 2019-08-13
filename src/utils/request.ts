import axios from 'axios';
import { get } from 'lodash';

export const request = axios.create({
  baseURL: '/api',
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'x-csrf-token'
});

request.interceptors.response.use(
  resp => resp.data,
  error => {
    error.busError = get(error, 'response.data.error');
    return Promise.reject(error);
  }
);

export default request;
