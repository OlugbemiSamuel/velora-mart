
import dayjs from "dayjs";
import { formatMoney } from "../../utils/Money";

const DeliveryOptions = ({deliveryOptions, cartItem}) => {
    return(
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
    )
}

export default DeliveryOptions