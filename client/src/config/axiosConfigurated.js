import axios from "axios";

export const axiosConfigurated = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  timeout: 5000
});
