import React from "react";
import { Sidebar } from "./components/sidebar";
import { Topbar } from "./components/topbar";
import "./App.scss";
import { Home } from "./pages/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserList } from "./pages/userList";
import { User } from "./pages/user";
import { NewUser } from "./pages/newUser";
import { ProductList } from "./pages/productList";
import { Product } from "./pages/product";
import { NewProduct } from "./pages/newProduct";
import { Login } from "./pages/Login";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/login">
        <Login />
      </Route>
  
        <Topbar />

        <div className="container">
        <Sidebar />
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/users">
            <UserList />
          </Route>

          <Route path="/user/:userId">
            <User />
          </Route>

          <Route path="/newUser">
            <NewUser />
          </Route>

          <Route path="/products">
            <ProductList />
          </Route>

          <Route path="/product/:productId">
            <Product />
          </Route>

          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
