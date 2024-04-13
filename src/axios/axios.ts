import axios from "axios";
const BACKEND_BASE_URL = import.meta.env.VITE_API_PATH;

export default axios.create({
  baseURL: BACKEND_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
