import "./CheckoutHeader.css";
import "./Checkout.css";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";

import OrderSummary from "./OrderSummary";
import PaymentSummmary from "./PaymentSummary";
import CheckoutHeader from "./CheckoutHeader";
import { useNavigate } from "react-router";

const CheckoutPage = ({ carts, getCartItems }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummmary, setPaymentSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getCheckoutPageData = async () => {
    setIsLoading(true);
    try {
        const [deliveryRes, paymentRes] = await Promise.all([
        await axios.get("/api/delivery-options?expand=estimatedDeliveryTime"),
        await axios.get("/api/payment-summary"),
      ]);
      setDeliveryOptions(deliveryRes.data);
      setPaymentSummary(paymentRes.data);
    } catch (error) {
      console.error("error loading checkout data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCheckoutPageData();
  }, [carts]);

  return (
    <>
      <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />

      <title>Checkout</title>
      <CheckoutHeader carts={carts} />

      {carts.length > 0 ? (
        <div class="checkout-page">
          <div class="page-title">Review your order</div>

          <div class="checkout-grid">
            <OrderSummary
              getCartItems={getCartItems}
              carts={carts}
              deliveryOptions={deliveryOptions}
            />
            <PaymentSummmary
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              getCartItems={getCartItems}
              paymentSummmary={paymentSummmary}
            />
          </div>
        </div>
      ) : (
        <div className="checkout-page">
          <div className="cart-empty-container">
            <h2>Your Cart is empty.</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <button
              className="view-products-button button-primary"
              onClick={() => navigate("/")}
            >
              View products
            </button>
          </div>
        </div>
      )}

      {/* <div class="checkout-header">
      </div> */}
    </>
  );
};
export default CheckoutPage;
