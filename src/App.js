import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  ProductDetails,
  Login,
  SignUp,
  WishList,
  Bag,
  Address,
  Payment,
} from "./components";
import { PrivateRoutes } from "./PrivateRoutes";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/shop/women" component={Dashboard} exact />{" "}
        <Route path="/shop/men" component={Dashboard} exact />{" "}
        <Route path="/shop/kids" component={Dashboard} exact />
        <Route path="/shop/:id" component={ProductDetails} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        <PrivateRoutes path="/wishlist" component={WishList} exact />
        <PrivateRoutes path="/checkout/cart" component={Bag} exact />
        <PrivateRoutes path="/checkout/address" component={Address} exact />
        <PrivateRoutes path="/checkout/payment" component={Payment} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
