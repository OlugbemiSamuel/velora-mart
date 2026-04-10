import Header from "../../components/Header";
import "./OrdersPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import OrdersGrid from "./OrdersGrid";

const OrdersPage = ({ carts }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("/api/orders?expand=products");
        setOrders(response.data);
      } catch (error) {
        console.error("orders error:", error);
      }
    };
    getOrders();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href="/orders-favicon.png" />

      <Header carts={carts} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} />
      </div>
    </>
  );
};

export default OrdersPage;
