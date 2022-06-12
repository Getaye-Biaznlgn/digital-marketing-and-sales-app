import axios from "axios";
let apiClient = axios.create({
  baseURL: "http://10.161.176.225:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
// http://10.161.166.108:80
//
export default apiClient;
