import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.38.13.43:3333',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
