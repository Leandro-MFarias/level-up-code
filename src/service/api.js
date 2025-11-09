import axios from "axios";

export const api = axios.create({
  baseURL: "https://level-up-code.onrender.com/api",
  withCredentials: true,
})