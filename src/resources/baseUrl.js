import axios from "axios";
let apiClient = axios.create({
  baseURL: "https://back-marketing-laravela-api.rensysengineering.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
