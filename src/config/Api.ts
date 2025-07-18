import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL;


export const axiosInstance = axios.create({
  baseURL: url,
  headers: { "Content-Type": "application/json" },
});

export const axiosInstanceMultipart = axios.create({
  baseURL: url,
  headers: { "Content-Type": "multipart/form-data" },
});

