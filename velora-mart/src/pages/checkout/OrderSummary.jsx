import dayjs from "dayjs";
import { formatMoney } from "../../utils/Money";
import DeliveryOptions from "./DeliveryOptions";

const OrderSummary = ({deliveryOptions, carts}) => {

    return (

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
                      <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem}/>

                     
                    </div>
                  </div>
                );
              })}
          </div>
    )
}

export default OrderSummary