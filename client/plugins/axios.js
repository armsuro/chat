import axios from 'axios';
import { API } from '../constants/env-vars';

const user = localStorage.getItem('user');
const token = user && JSON.parse(user).token;

export default () => {
  const service = axios.create({
    baseURL: API, // url of the api
    headers: {
      Authorization: token || ''
    }
  });
  service.interceptors.response.use(
    response => response,
    error => {
      throw error;
    }
  );
  return service;
};
