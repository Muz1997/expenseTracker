import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
// eslint-disable-next-line
import { Navigate, createBrowserRouter } from "react-router-dom";
// eslint-disable-next-line
import Cookies from "js-cookie";
import CheckAuth from "./utils/CheckAuth";
import Guest from "./utils/Guest";

//const token = Cookies.get("token");

export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),

        //element: token ? <Home /> : <Navigate to="/login" replace={true} />,
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
    ],
  },
]);
