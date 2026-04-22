import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import './TrackingPage.css'
import { Link } from 'react-router'
import { useParams } from 'react-router'
import axios from 'axios'
import dayjs from 'dayjs'

const TrackingPage = ({carts}) => {
  const [order, setOrder] = useState(null);
  const {orderId, productId} = useParams();

  useEffect(() => {
    const getTrackingPageData = async () => {
     try{
      const response =  await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data)
     } catch(error) {
      console.error(error);

     }
    }
    getTrackingPageData()

  }, [orderId])

  if(!order) return;

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });


  const totalDeliveryTimeMs =  orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs.valueOf() - order.orderTimeMs;
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;
  if(deliveryPercent > 100){
    deliveryPercent = 100
  }
  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent > 33 < 100;
  const isDelivered = deliveryPercent === 100




    return(
        <>

      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />


        <Header cart={carts}/>

         <div className="tracking-page">
      <div className="order-tracking">
        <Link className="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </Link>

        <div className="delivery-date">
          {deliveryPercent >= 100 ? 'Delivered' : 'Arriving'} on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd MMMM, D')}
        </div>

        <div className="product-info">
      {orderProduct.product.name}
        </div>

        <div className="product-info">
          Quantity:{orderProduct.quantity}
        </div>

        <img className="product-image" src={orderProduct.product.image} />

        <div className="progress-labels-container">
          <div className={`progress-label ${isPreparing && 'current-status'} `}>
            Preparing
          </div>
          <div className={`progress-label ${isShipped && 'current-status'} `}>
            Shipped
          </div>
          <div className={`progress-label ${isDelivered && 'current-status'} `}>
            Delivered
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{width: `${deliveryPercent}%`}}></div>
        </div>
      </div>
    </div>
       
        
        </>

    )
}

export default TrackingPage