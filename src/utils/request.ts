import axios from 'axios';

export const request = axios.create({
  baseURL: '/api'
});

request.interceptors.response.use(resp => resp.data);

export default request;
