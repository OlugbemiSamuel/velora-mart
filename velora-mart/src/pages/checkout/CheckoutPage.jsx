import "./CheckoutHeader.css";
import "./Checkout.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

import OrderSummary from "./OrderSummary";
import PaymentSummmary from "./PaymentSummary";
import CheckoutHeader from "./CheckoutHeader";

const CheckoutPage = ({ carts, getCartItems }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummmary, setPaymentSummary] = useState(null);

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

  useEffect(() => {
   
    getCheckoutPageData();
  
  }, [carts]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <title>Checkout</title>
        <CheckoutHeader carts={carts}/>


      {/* <div class="checkout-header">
      </div> */}

      <div class="checkout-page">
        <div class="page-title">Review your order</div>

        <div class="checkout-grid">
          <OrderSummary getCartItems={getCartItems} carts={carts} deliveryOptions={deliveryOptions}/>
          <PaymentSummmary paymentSummmary={paymentSummmary}/>
         

         
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
