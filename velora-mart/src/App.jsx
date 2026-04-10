
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/home/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/tracking/TrackingPage'
import OrdersPage from './pages/orders/OrdersPage'
import ErrorPage from './pages/error/ErrorPage'
import { useEffect, useState } from 'react'
import axios from 'axios'
 


function App() {

  const [carts, setCarts] = useState([]);


   useEffect(() => {
      const getCartItems = async () => {

      try{
        const response = await axios.get(`/api/cart-items?expand=product`);
      setCarts(response.data);
      } catch(error) {
        console.error(`carterror:`, error)
      }
    }
    getCartItems();

   }, [])
 

  return (
 <Routes>
  <Route path='/' element={<HomePage carts={carts} />}/>
  <Route path='checkout' element={<CheckoutPage carts={carts}/>}/>
  <Route path='tracking' element={<TrackingPage/>}/>
  <Route path='orders' element={<OrdersPage carts={carts}/>}/>
  <Route path='*' element={<ErrorPage/>}/>

 </Routes>
   
  )
}

export default App
