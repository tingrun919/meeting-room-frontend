import axios from 'axios';

export const request = axios.create({
  baseURL: '/api',
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'x-csrf-token'
});

request.interceptors.response.use(resp => resp.data);

export default request;
