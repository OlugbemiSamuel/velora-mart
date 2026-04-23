import { Route, Routes } from "react-router";
import "./App.css";
import HomePage from "./pages/homepage/HomePage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import TrackingPage from "./pages/tracking/TrackingPage";
import OrdersPage from "./pages/orders/OrdersPage";
import ErrorPage from "./pages/error/ErrorPage";
import { useEffect, useState } from "react";
import axios from "axios";
import type { CartItem } from "./types/ecommerce";

function App() {
  const [carts, setCarts] = useState<CartItem[]>([]);

  const getCartItems = async () => {
    try {
      const response = await axios.get(`/api/cart-items?expand=product`);
      const data = response.data as CartItem[];
      setCarts(data);
    } catch (error) {
      console.error(`carterror:`, error);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // window.axios   = axios;
  

  


  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage getCartItems={getCartItems} carts={carts} />}
      />
      <Route path="checkout" element={<CheckoutPage getCartItems={getCartItems} carts={carts} />} />
      <Route
        path="tracking/:orderId/:productId"
        element={<TrackingPage carts={carts} />}
      />
      <Route path="orders" element={<OrdersPage getCartItems={getCartItems} carts={carts} />} />
      <Route path="*" element={<ErrorPage carts={carts} />} />
    </Routes>
  );
}

export default App;
