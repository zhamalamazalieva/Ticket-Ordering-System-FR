import React, { useEffect } from "react";
import { Redirect, useHistory, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// const Login = React.lazy(() => import('../login/Login'))
// const Register = React.lazy(() => import('../register/Register'))
// const Page404 = React.lazy(() => import('../page404/Page404'))

import Login from "../login/Login";
import Page404 from "../page404/Page404";
import HomePage from "../home/HomePage";
import Departments from "../departments/Departments";
import Rooms from "../rooms/Rooms";
import Users from "../users/Users";
import Employees from "../employees/Employees";



function Routes() {
  const history = useHistory();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login");
    }
  }, [isAuthenticated]);
  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route exact path="/departments">
          <Departments />
        </Route>
        <Route exact path="/rooms">
          <Rooms />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/employees">
          <Employees />
        </Route>
        <Route path="">
          <Page404 />
        </Route>
      </Switch>
    </div>
  );
}

export default Routes;
