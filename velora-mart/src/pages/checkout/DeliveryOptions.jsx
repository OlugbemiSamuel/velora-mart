import dayjs from "dayjs";
import { formatMoney } from "../../utils/Money";
import axios from "axios";

const DeliveryOptions = ({ deliveryOptions, cartItem, getCartItems }) => {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let shippingFee = "FREE Shipping";

        if (deliveryOption.priceCents > 0) {
          shippingFee = formatMoney(deliveryOption.priceCents);
        }

        const updateDeliveryOption = async () => {
          try{
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id,
          });
          } catch(error){
            console.error('update error:', error)
          }
          await getCartItems();
        };

        return (
          <div
            onClick={updateDeliveryOption}
            key={deliveryOption.id}
            className="delivery-option"
          >
            <input
              onChange={() => {}}
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>
              <div className="delivery-option-price">{shippingFee}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DeliveryOptions;
