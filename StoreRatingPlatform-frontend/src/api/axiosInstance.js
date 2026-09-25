import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // sends the JWT cookie set by the backend
});

export default axiosInstance;
