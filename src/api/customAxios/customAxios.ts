import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_LAN && typeof window !== "undefined"
    ? (window.location.hostname === "localhost"
        ? process.env.NEXT_PUBLIC_API_URL_LOCAL
        : process.env.NEXT_PUBLIC_API_URL_LAN)
    : process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
