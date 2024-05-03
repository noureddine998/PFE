import axios from "axios";

export const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/', // Base URL for all calls
  withCredentials:true,
  withXSRFToken: true,
});

