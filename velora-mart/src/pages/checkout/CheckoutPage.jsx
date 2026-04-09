import "./CheckoutHeader.css";
import "./Checkout.css";
import Header from "../../components/Header";
import { formatMoney } from "../../utils/Money";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const CheckoutPage = ({ carts }) => {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummmary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getDeliveryOption = async () => {
      try {
        const response = await axios.get(
          "/api/delivery-options?expand=estimatedDeliveryTime",
        );
        setDeliveryOptions(response.data);
      } catch (error) {
        console.error("deliveryoption error:", error);
      }
    };
    getDeliveryOption();

    const getPaymentSummary = async () => {
      try {
        const response = await axios.get("/api/payment-summary");
        setPaymentSummary(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPaymentSummary();
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
          <div class="order-summary">
            {deliveryOptions.length > 0 &&
              carts.map((cartItem) => {
                const deliveryDate = deliveryOptions.find((deliveryOption) => {
                  return deliveryOption.id === cartItem.deliveryOptionId;
                });

                return (
                  <div key={cartItem.productId} class="cart-item-container">
                    <div class="delivery-date">
                      Delivery date:{" "}
                      {dayjs(deliveryDate.estimatedDeliveryTimeMs).format(
                        "dddd, MMMM D",
                      )}
                    </div>

                    <div class="cart-item-details-grid">
                      <img
                        class="product-image"
                        src={`${cartItem.product.image}`}
                      />

                      <div class="cart-item-details">
                        <div class="product-name">{cartItem.product.name}</div>
                        <div class="product-price">
                          {formatMoney(cartItem.product.priceCents)}
                        </div>
                        <div class="product-quantity">
                          <span>
                            Quantity:{" "}
                            <span class="quantity-label">
                              {cartItem.quantity}
                            </span>
                          </span>
                          <span class="update-quantity-link link-primary">
                            Update
                          </span>
                          <span class="delete-quantity-link link-primary">
                            Delete
                          </span>
                        </div>
                      </div>

                      <div class="delivery-options">
                        <div class="delivery-options-title">
                          Choose a delivery option:
                        </div>
                        {deliveryOptions.map((deliveryOption) => {
                          let shippingFee = "FREE Shipping";

                          if (deliveryOption.priceCents > 0) {
                            shippingFee = formatMoney(
                              deliveryOption.priceCents,
                            );
                          }

                          return (
                            <div
                              key={deliveryOption.id}
                              class="delivery-option"
                            >
                              <input
                                type="radio"
                                checked={
                                  deliveryOption.id ===
                                  cartItem.deliveryOptionId
                                }
                                class="delivery-option-input"
                                name={`delivery-option-${cartItem.productId}`}
                              />
                              <div>
                                <div class="delivery-option-date">
                                  {dayjs(
                                    deliveryOption.estimatedDeliveryTimeMs,
                                  ).format("dddd, MMMM D")}
                                </div>
                                <div class="delivery-option-price">
                                  {shippingFee}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div class="payment-summary">
            <div class="payment-summary-title">Payment Summary</div>

            {paymentSummmary && (
              <>
                <div class="payment-summary-row">
                  <div>Items ({paymentSummmary?.totalItems}):</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.productCostCents)}
                  </div>
                </div>

                <div class="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.shippingCostCents)}
                  </div>
                </div>

                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.totalCostBeforeTaxCents)}
                  </div>
                </div>

                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.taxCents)}
                  </div>
                </div>

                <div class="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div class="payment-summary-money">
                    {formatMoney(paymentSummmary.totalCostCents)}
                  </div>
                </div>

                <button class="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
