import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

// Apply base URL for axios
const API_URL = "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config }).then(response => response.data);
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then(response => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then(response => response.data);
}
