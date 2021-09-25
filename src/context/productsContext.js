import { createContext, useContext, useReducer } from "react";

const productsContext = createContext();

const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action?.payload };

    case "SET_FILTERS_LIST":
      return { ...state, filters: action?.payload };

    case "SET_SELECTED_FILTERS":
      return { ...state, selectedFilters: action?.payload };

    case "SET_WISHLIST_ITEMS":
      return { ...state, wishlistItems: action?.payload };

    case "SET_CART_ITEMS":
      return { ...state, cartItems: action?.payload };
    default:
      return state;
  }
};
const initalState = {
  products: [],
  orders: [],
  cartItems: [],
  wishlistItems: [],
  sortBy: "",
  filters: null,
  selectedFilters: {
    categories: [],
    brands: [],
    colors: [],
  },
};

export const ProductsProvider = ({ children }) => {
  const [productsState, productsDispatch] = useReducer(
    productsReducer,
    initalState
  );

  return (
    <productsContext.Provider value={{ productsState, productsDispatch }}>
      {children}
    </productsContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(productsContext);
};
