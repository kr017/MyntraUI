import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { Dashboard, ProductDetails, WishList, Bag, Login } from "./components";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/shop/women" component={Dashboard} exact />{" "}
        <Route path="/shop/men" component={Dashboard} exact />{" "}
        <Route path="/shop/kids" component={Dashboard} exact />
        {/* <Route path="/productDetails" component={ProductDetails} exact /> */}
        {/* <Route path='/shop/:id' element={<ProductDetailPage />} /> */}
        <Route path="/shop/:id" component={ProductDetails} exact />
        <Route path="/wishlist" component={WishList} exact />
        <Route path="/checkout/cart" component={Bag} exact />
        <Route path="/login" component={Login} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
