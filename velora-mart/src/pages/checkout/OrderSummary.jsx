import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

const OrderSummary = ({ deliveryOptions, carts }) => {
  return (
    <div class="order-summary">
      {deliveryOptions.length > 0 &&
        carts.map((cartItem) => {
          const deliveryDate = deliveryOptions.find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId;
          });

          return (
            <div key={cartItem.productId} class="cart-item-container">
              <DeliveryDate deliveryDate={deliveryDate} />

              <div class="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} />

                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default OrderSummary;
