import { axiosClient } from "./apiClient";

export function getAllProducts(data) {
  return axiosClient.post("/product/shop", data);
}

export function getProductDetails(id) {
  return axiosClient.get("/product/shop/" + id);
}

export function getFiltersList(data) {
  return axiosClient.post("/product/filters", data);
}

export function addItemToWishList(data) {
  return axiosClient.post("/wishlist/api/addWishlist", data);
}

export function getItemsFromWishList() {
  return axiosClient.get("/wishlist/api/wishlist");
}

export function removeItemFromWishlist(data) {
  return axiosClient.post("/wishlist/api/removeWishlist", data);
}

export function addItemToCart(data) {
  return axiosClient.post("/cart/api/addCart", data);
}

export function getItemsFromCart() {
  return axiosClient.get("/cart/api/cart");
}

export function removeItemFromCart(data) {
  return axiosClient.post("/cart/api/removeCart", data);
}

export function addPaymnet(data) {
  return axiosClient.post("/cart/api/checkout", data);
}

export function getOrders() {
  return axiosClient.get("/cart/api/orders");
}

export function addRzpOrder(data) {
  return axiosClient.post("/cart/api/rzpOrder", data);
}
export function addRzpPayment(data) {
  return axiosClient.post("/cart/api/rzpPayment", data);
}
