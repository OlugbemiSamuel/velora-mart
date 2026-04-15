import axios from "axios";
import { formatMoney } from "../../utils/Money";

const CartItemDetails = ({cartItem, getCartItems}) => {

  const deleteCartItem = async () => {
    try{
    await axios.delete(`/api/cart-items/${cartItem.productId}`)

    } catch(error){
      console.error('failed to delete:', error)
    }
     await getCartItems();

  }


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
          <span onClick={deleteCartItem} class="delete-quantity-link link-primary">Delete</span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails
