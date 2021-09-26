import axios from "axios";
// import { useLogin } from "../context";

const axiosClient = axios.create({
  // baseURL: `http://localhost:5500/`,

  baseURL: `http://13.126.37.93:5500/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.request.use(
  function (request) {
    let token = JSON.parse(localStorage.getItem("hint"));
    if (request.url.includes("api")) {
      request.headers.authorization = token.token;
    }

    return request;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error?.response;

    if (res?.status === 401) {
      localStorage.clear();
    }

    console.error(
      `Looks like there was a problem. Status Code: ` + res?.status
    );
    return Promise.reject(error);
  }
);
export { axiosClient };
