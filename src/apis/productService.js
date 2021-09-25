import { axiosClient } from "./apiClient";

export function getAllProducts(data) {
  return axiosClient.post("/shop", data);
}

export function getProductDetails(id) {
  return axiosClient.get("/shop/" + id);
}

export function getFiltersList(data) {
  return axiosClient.post("/filters", data);
}

export function addItemToWishList(data) {
  return axiosClient.post("/api/addWishlist", data);
}

export function getItemsFromWishList() {
  return axiosClient.get("/api/wishlist");
}

export function addItemToCart(data) {
  return axiosClient.post("/api/addCart", data);
}

export function getItemsFromCart() {
  return axiosClient.get("/api/cart");
}

export function addPaymnet(data) {
  return axiosClient.post("/api/checkout", data);
}
