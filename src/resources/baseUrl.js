import axios from "axios";
let apiClient = axios.create({
  baseURL: "http://10.161.69.187:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
