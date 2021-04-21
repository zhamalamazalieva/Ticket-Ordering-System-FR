import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import FullPageSpinner from "../../components/spinners/FullPageSpinner";
import PrivateRoute from "../../containers/PrivateRoute";

const Login = React.lazy(() => import("../login/Login"));
const Page404 = React.lazy(() => import("../page404/Page404"));
const HomePage = React.lazy(() => import("../home/HomePage"));
const Departments = React.lazy(() => import("../departments/Departments"));
const Rooms = React.lazy(() => import("../rooms/Rooms"));
const Users = React.lazy(() => import("../users/Users"));
const Employees = React.lazy(() => import("../employees/Employees"));
const RoomsDetails = React.lazy(() =>
  import("../../components/rooms/RoomsDetail")
);
const Flows = React.lazy(() => import("../flows/Flows"))

function Routes() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/home">
          <HomePage />
        </PrivateRoute>
        <PrivateRoute exact path="/departments">
          <Departments />
        </PrivateRoute>
        <PrivateRoute exact path="/rooms">
          <Rooms />
        </PrivateRoute>
        <PrivateRoute exact path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact path="/employees">
          <Employees />
        </PrivateRoute>
        <PrivateRoute exact path="/roomdetails/:roomId">
          <RoomsDetails />
        </PrivateRoute>
        <PrivateRoute exact path="/flows">
          <Flows />
        </PrivateRoute>
        <Route path="">
          <Page404 />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default Routes;
