import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import axios from "axios";

const DeliveryOptions = ({ deliveryOptions, cartItem, getCartItems }) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-bold text-gray-900">Choose a delivery option:</p>
      {deliveryOptions.map((deliveryOption) => {
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        const shippingFee = deliveryOption.priceCents === 0 ? "FREE " : formatMoney(deliveryOption.priceCents);

        const updateDeliveryOption = async () => {
          await axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id
            });
            await getCartItems();
          }

        return (
          <label 
          onClick={updateDeliveryOption}
            key={deliveryOption.id}
            className={`flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors ${
              isChecked ? "border-yellow-100 bg-yellow-50" : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              className="mt-1 h-4 w-4 bg-yellow-50"
              checked={isChecked}
              onChange={() => {}}
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-green-700">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
              </span>
              <span className="text-xs text-gray-500">{shippingFee} - Shipping</span>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default DeliveryOptions;
