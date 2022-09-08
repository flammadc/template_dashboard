import React, { lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import Cookies from "universal-cookie";

import { useSelector } from "react-redux";
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  // const user = false;
  const user = useSelector((state) => state.user.currentUser);
  const [userToken, setUserToken] = useState();
  const cookies = new Cookies();

  useEffect(() => {
    setUserToken(cookies.get("user_token"));
  }, [user]);

  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login">
            {userToken ? <Redirect from="login" to="/app" /> : <Login />}
          </Route>

          {/* Place new routes over this */}
          <Route path="/app" component={userToken ? Layout : Login} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
