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

    case "REMOVE_WISHLIST_ITEMS":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          wish => wish._id !== action.payload._id
        ),
      };
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action?.payload };

    case "REMOVE_CART_ITEMS":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cart => cart._id !== action.payload._id
        ),
      };

    case "SET_ORDERS_LIST":
      return { ...state, ordersList: action?.payload };

    default:
      return state;
  }
};
const initalState = {
  products: [],
  orders: [],
  cartItems: [],
  wishlistItems: [],
  ordersList: [],
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
