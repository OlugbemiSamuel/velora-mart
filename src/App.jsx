
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/homepage/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/tracking/TrackingPage'
import OrdersPage from './pages/orders/OrdersPage'
import ErrorPage from './pages/error/ErrorPage'


function App() {
 

  return (
 <Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='checkout' element={<CheckoutPage/>}/>
  <Route path='tracking' element={<TrackingPage/>}/>
  <Route path='orders' element={<OrdersPage/>}/>
  <Route path='*' element={<ErrorPage/>}/>

 </Routes>
   
  )
}

export default App
