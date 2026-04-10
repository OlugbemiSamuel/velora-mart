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



    return(
        <>

      <link rel="icon" type="image/svg+xml" href="/tracking-favicon.png" />


        <Header cart={carts}/>

         <div class="tracking-page">
      <div class="order-tracking">
        <Link class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </Link>

        <div class="delivery-date">
          Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd MMMM, D')}
        </div>

        <div class="product-info">
      {orderProduct.product.name}
        </div>

        <div class="product-info">
          Quantity:{orderProduct.quantity}
        </div>

        <img class="product-image" src={orderProduct.product.image} />

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>
       
        
        </>

    )
}

export default TrackingPage