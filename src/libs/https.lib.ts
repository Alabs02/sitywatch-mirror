import { baseURI } from "@/constants/apiRoutes";
import axios from "axios";

export const http = axios.create({
  baseURL: baseURI,
  withCredentials: false
})