import { formatMoney } from "../../utils/Money";

const CartItemDetails = ({cartItem}) => {
  return (
    <>
      <img class="product-image" src={`${cartItem.product.image}`} />

      <div class="cart-item-details">
        <div class="product-name">{cartItem.product.name}</div>
        <div class="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">{cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary">Update</span>
          <span class="delete-quantity-link link-primary">Delete</span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails
