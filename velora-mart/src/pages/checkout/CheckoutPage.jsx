import './CheckoutHeader.css'
import './Checkout.css'
import Header from '../../components/Header'
import { formatMoney } from '../../utils/Money'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

const CheckoutPage = ({carts}) => {

  const [deliveryOptions, setDeliveryOptions] = useState([]);

  useEffect(() => {
    const getDeliveryOption = async () => {
      try{
        const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
      } catch(error) {
        console.error('deliveryoption error:', error)
      }
    }
    getDeliveryOption();
  }, [])


    return(
        <>

        <link rel="icon" type="image/svg+xml" href="/cart-favicon.png" />


        <title>Checkout</title>

        <div class="checkout-header">
     <Header/>
    </div>

    <div class="checkout-page">
      <div class="page-title">Review your order</div>

      <div class="checkout-grid">
        <div class="order-summary">
          { deliveryOptions.length > 0 && carts.map((cartItem) => {

            const deliveryDate = deliveryOptions.find((deliveryOption) => {
             return deliveryOption.id === cartItem.deliveryOptionId

            })

            return(
               <div key={cartItem.productId} class="cart-item-container">
            <div class="delivery-date">
              Delivery date: {dayjs(deliveryDate.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="images/products/athletic-cotton-socks-6-pairs.jpg" />

              <div class="cart-item-details">
                <div class="product-name">
                 {cartItem.product.name}
                </div>
                <div class="product-price">
                 {formatMoney(cartItem.product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">{cartItem.quantity}</span>
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
                  let shippingFee = 'FREE Shipping';

                  if(deliveryOption.priceCents > 0) {
                    shippingFee = formatMoney(deliveryOption.priceCents)
                  }


                  return (
                     <div key={deliveryOption.id} class="delivery-option">
                  <input type="radio"
                   checked = {deliveryOption.id === cartItem.deliveryOptionId}
                    class="delivery-option-input"
                    name={`delivery-option-${cartItem.productId}` }/>
                  <div>
                    <div class="delivery-option-date">
                     {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                    </div>
                    <div class="delivery-option-price">
                      {shippingFee}
                    </div>
                  </div>
                </div>
                  )

                })
                }
               
               
              </div>
            </div>
          </div>
            )
          })

          }
         
        </div>

        <div class="payment-summary">
            <div class="payment-summary-title">
              Payment Summary
            </div>

            <div class="payment-summary-row">
              <div>Items (3):</div>
              <div class="payment-summary-money">$42.75</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$4.99</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$47.74</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$4.77</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$52.51</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>
        </div>
      </div>
    </div>
        
        </>


    )
}
 export default CheckoutPage