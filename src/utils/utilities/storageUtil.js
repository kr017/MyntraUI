export const setStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = data => {
  return JSON.parse(localStorage.getItem(data));
};
