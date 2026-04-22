import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

const CartItemDetails = ({cartItem, getCartItems}) => {
  const [isUpdateQuantity, setIsUpdateQuantity] = useState(false);
  const [quantity, setQuantity] = useState(Number(cartItem.quantity));
      


  const deleteCartItem = async () => {
    try{
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
     await getCartItems();
    } catch(error){
      console.error('failed to delete:', error)
    }

  }

  const updateQuantity =  async () => {

    try{
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(quantity)
      })
      await getCartItems();
    } catch(error){
      console.log('error', error)
    }

  }

  const onUpdateQuantity = () => {
    if(!isUpdateQuantity){
  setIsUpdateQuantity(true)
  } else{
    updateQuantity();
    setIsUpdateQuantity(false);
    
  }
  
  }
  
  const onChangeQuantity = (e) => {
    setQuantity(e.target.value)
  }

  const onKeyEvent = (e) => {
    if(e.key === 'Enter') {
      updateQuantity();
      setIsUpdateQuantity(false);
    } else if (e.key === 'Escape'){
      setQuantity(cartItem.quantity);
      setIsUpdateQuantity(false);

    }
  }


  return (
    <>
      <img className="product-image" src={`${cartItem.product.image}`} />

      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
             Quantity:
           {isUpdateQuantity ? (
            <input onKeyDown={onKeyEvent} onChange={onChangeQuantity} value={quantity} type="text" className="quantity-input"/>
           ) : ( <span className="quantity-label">{cartItem.quantity}</span>) }
          </span>
          <span onClick={onUpdateQuantity} className="update-quantity-link link-primary">Update</span>
          <span onClick={deleteCartItem} className="delete-quantity-link link-primary">Delete</span>
        </div>
      </div>
    </>
  );
};

export default CartItemDetails
