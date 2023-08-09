import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LandingPage } from "./HomePage/LandingPage";
import { Route } from "react-router-dom";
import { NotFoundTitle } from "./NotFoundTitle";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Bookings from "./Bookings";
import Listings from "./Listings";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Delete the token from local storage
    localStorage.removeItem("token");
    // Redirect to home
    navigate("/home");
  }, [navigate]);

  return null; // Return null since we don't want to render anything on the screen for this component.
}

export default function AllRoutes() {
  const paths = [
    {
      path: "/home",
      element: <LandingPage />,
    },
    {
      path: "/",
      element: <LandingPage />,
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/bookings",
        element: <Bookings />
    },
    {
        path: "/listings",
        element: <Listings />
    },
    {
        path: "*",
        element: <NotFoundTitle />
    }
  ];
  return (
    <>
      {paths.map((obj) => {
        return (
            <Route path={obj.path} element={obj.element} />
        );
      })}
    </>
  );
}
