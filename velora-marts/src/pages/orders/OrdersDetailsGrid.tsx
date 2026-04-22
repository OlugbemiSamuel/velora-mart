import dayjs from "dayjs";
import buyagain from "../../assets/images/icons/buy-again.png";
import {Fragment} from 'react'
import { Link } from "react-router";

import axios from "axios";


const OrdersDetailsGrid = ({order, getCartItems, setIsLoading, isLoading}) => {

  


   const addToCart = async (productId) => {
    setIsLoading(true);
    try{
      await axios.post("/api/cart-items", {
      productId: productId,
      quantity: 1
    });
    getCartItems()
    } catch(error){
      console.error('failed to add item:', error)
    } finally{
      setIsLoading(false);
    }
  };

  


    return(
        <div className="order-details-grid">
                  {order?.products?.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.product.id}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("MMMM D",)}
                          </div>
                          <div className="product-quantity">
                            Quantity: {orderProduct.quantity}
                          </div>
                          <button disabled={isLoading} onClick={() => addToCart(orderProduct.product.id)} className="buy-again-button button-primary">
                            <img className="buy-again-icon" src={buyagain} />
                            <span  className="buy-again-message">Add to Cart</span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to={`/tracking/${order.id}/${orderProduct.product.id}`}>
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
    )
};

export default OrdersDetailsGrid