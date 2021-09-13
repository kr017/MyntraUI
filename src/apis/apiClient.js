import axios from "axios";
// import { useLogin } from "../context";

const axiosClient = axios.create({
  baseURL: `http://localhost:5000/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export { axiosClient };
