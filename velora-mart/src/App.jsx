import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import OrdersPage from "./pages/orders/OrdersPage";
import ErrorPage from "./pages/error/ErrorPage";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [carts, setCarts] = useState([]);

  const getCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart-items?expand=product`);
      setCarts(response.data);
    } catch (error) {
      console.error(`carterror:`, error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  


  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage getCartItems={getCartItems} carts={carts} />}
      />
      <Route path="checkout" element={<CheckoutPage carts={carts} />} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage carts={carts} />}
      />
      <Route path="orders" element={<OrdersPage carts={carts} />} />
      <Route path="*" element={<ErrorPage carts={carts} />} />
    </Routes>
  );
}

export default App;
