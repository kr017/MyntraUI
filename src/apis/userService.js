import { axiosClient } from "./apiClient";

export function checkMail(data) {
  return axiosClient.post("/user/checkMail", data);
}

export function login(data) {
  return axiosClient.post("/user/login", data);
}

export function signup(data) {
  return axiosClient.post("/user/signup", data);
}

export function getAddressList() {
  return axiosClient.get("/api/addresses");
}
export function addAddress(data) {
  return axiosClient.post("/api/addAddress", data);
}
