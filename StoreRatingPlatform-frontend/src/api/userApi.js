import axiosInstance from "./axiosInstance.js";

export const getStoresForUser = (params) => axiosInstance.get("/user/stores", { params });
export const submitRating = (sid, rating) => axiosInstance.post(`/user/stores/${sid}/rating`, { rating });
