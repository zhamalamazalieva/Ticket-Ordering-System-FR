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
const Flows = React.lazy(() => import("../flows/Flows"));
const Categories = React.lazy(() => import("../categories/Categories"));
const RoomsByCategory = React.lazy(() => import("../rooms/RoomsByCategory"));
const Positions = React.lazy(() => import("../positions/Positions"));
const EmployeesByPosition = React.lazy(() =>
  import("../employees/EmployeesByPosition")
);
const Booking = React.lazy(() => import("../booking/Booking"));
const BookingDetails = React.lazy(() => import("../../components/booking/BookingDetails"));

function Routes() {
  return (
    <Suspense fallback={<FullPageSpinner />}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <PrivateRoute exact path="/">
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
        <PrivateRoute exact path="/categories">
          <Categories />
        </PrivateRoute>
        <PrivateRoute exact path="/categories/:categoryId">
          <RoomsByCategory />
        </PrivateRoute>
        <PrivateRoute exact path="/positions">
          <Positions />
        </PrivateRoute>
        <PrivateRoute exact path="/positions/:positionId">
          <EmployeesByPosition />
        </PrivateRoute>
        <PrivateRoute exact path="/booking">
          <Booking />
        </PrivateRoute>
        <PrivateRoute exact path="/bookingDetails/:roomId">
          <BookingDetails />
        </PrivateRoute>
        <Route path="">
          <Page404 />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default Routes;
