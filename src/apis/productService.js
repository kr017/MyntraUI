import { axiosClient } from "./apiClient";

export function getAllProducts(data) {
  return axiosClient.post("/shop", data);
}

export function getProductDetails(id) {
  return axiosClient.get("/shop/" + id);
}
