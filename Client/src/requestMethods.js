import axios from "axios";
const BASE_URL = "https://localhost:443/api/";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
