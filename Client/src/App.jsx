import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderUserLogin from "./pages/OrderUserLogin";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import UserOrders from "./pages/UserOrders";
import React from "react";
const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div style={{ width: "100vw", height: "auto", overflowX: "hidden" }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>

          <Route path="/product/:id">
            <Product />
          </Route>
          <Route exact path="/orderuserlogin">
            <OrderUserLogin />
          </Route>

          <Route path="/checkout">
            {user ? <Checkout /> : <OrderUserLogin />}
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
          {user && (
            <Route path="/userorders">
              <UserOrders />
            </Route>
          )}

          <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
          <Route path="/register">
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
