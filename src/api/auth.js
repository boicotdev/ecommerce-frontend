import axios from "axios";
import { apiURL } from "./baseUrls";

export const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    "Content-Type": "application/json",
  },
});
