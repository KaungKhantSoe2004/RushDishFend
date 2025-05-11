import { createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./pages/home"
import RestaurantDetails from "./pages/restaurant-details"
import Cart from "./pages/cart"
import Login from "./pages/login"
import Register from "./pages/register"
import ForgotPassword from "./pages/forgot-password"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "restaurants/:id",
        element: <RestaurantDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
])

export default router
