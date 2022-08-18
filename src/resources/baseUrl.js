import axios from "axios";
let apiClient = axios.create({
  baseURL: "https://rensys-laravel.merahitechnologies.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;
