import React, { lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";

import { AuthAPI } from "./apis/AuthAPI";
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  const user = true;

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // ProductAPI.getAll().then((products) => {
  //   //   // response handling
  //   //   setProducts(products);
  //   // });

  //   AuthAPI.login().then((user) => {
  //     console.log(user);
  //   });
  // }, []);

  // console.log(products);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login">
            {user ? <Redirect from="login" to="/app" /> : <Login />}
          </Route>

          {/* Place new routes over this */}
          <Route path="/app" component={user ? Layout : Login} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
