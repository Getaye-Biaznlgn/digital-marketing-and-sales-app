import axios from "axios";
let apiClient = axios.create({
  baseURL: "http://10.161.176.225:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
