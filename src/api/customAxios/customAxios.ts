import axios from "axios";
export const customAxios = axios.create({
  baseURL: "https://news24.muhammad-yusuf.uz/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
