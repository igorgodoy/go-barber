import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3336',
});

export default api;
