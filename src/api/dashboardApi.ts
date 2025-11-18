import axios from "axios";

const dashboardApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  timeout: 10000,
});

export default dashboardApi;
