import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_PATH || '',
});

export const fetcher = async (resource: any, init: any) =>
  axiosInstance.get(resource, init).then((res) => res.data);

export default axiosInstance;
