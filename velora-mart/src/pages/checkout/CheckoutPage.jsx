import "./CheckoutHeader.css";
import "./Checkout.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

import OrderSummary from "./OrderSummary";
import PaymentSummmary from "./PaymentSummary";

const CheckoutPage = ({ carts }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummmary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getCheckoutPageData = async () => {
      try {
        const [deliveryRes, paymentRes] = await Promise.all([
           await axios.get("/api/delivery-options?expand=estimatedDeliveryTime"),
           await axios.get("/api/payment-summary")
        
        ]);
        setDeliveryOptions(deliveryRes.data);
        setPaymentSummary(paymentRes.data)
      } catch (error) {
        console.error("error loading checkout data:", error);
      }
    };
    getCheckoutPageData();
  
  }, []);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <title>Checkout</title>
        <Header />


      {/* <div class="checkout-header">
      </div> */}

      <div class="checkout-page">
        <div class="page-title">Review your order</div>

        <div class="checkout-grid">
          <OrderSummary carts={carts} deliveryOptions={deliveryOptions}/>
          <PaymentSummmary paymentSummmary={paymentSummmary}/>
         

         
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
