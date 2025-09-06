import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://45.76.94.219:7777/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
