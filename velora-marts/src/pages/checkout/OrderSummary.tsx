import DeliveryOptions from "./DeliveryOptions";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";



const OrderSummary = ({ deliveryOptions, carts, getCartItems }) => {
  return (
    <div className="flex flex-col gap-4">
      {deliveryOptions.length > 0 &&
        carts.map((cartItem) => {
          const deliveryOption = deliveryOptions.find(
            (opt) => opt.id === cartItem.deliveryOptionId
          );

          return (
            <div key={cartItem.productId} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              {/* Top Section: Delivery Date */}
              <div className="mb-2 pb-2">
                <DeliveryDate deliveryDate={deliveryOption} />
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Left Side: Product Image & Details */}
                <CartItemDetails getCartItems={getCartItems} cartItem={cartItem} />

                {/* Right Side: Delivery Options */}
                <DeliveryOptions
                  getCartItems={getCartItems}
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
