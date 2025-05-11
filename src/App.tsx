import { Routes, Route } from "react-router-dom"
import { Layout } from "./components/layout"
import HomePage from "./pages/home"
import RestaurantDetailsPage from "./pages/restaurant-details"
import CartPage from "./pages/cart"
import LoginPage from "./pages/login"
import { Toaster } from "./components/ui/toaster"

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <Layout>
              <RestaurantDetailsPage />
            </Layout>
          }
        />
        <Route
          path="/cart"
          element={
            <Layout>
              <CartPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </>
  )
}
