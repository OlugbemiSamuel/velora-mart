
import { Route, Routes } from 'react-router'
import './App.css'
import HomePage from './pages/homepage/HomePage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/tracking/TrackingPage'
import OrdersPage from './pages/orders/OrdersPage'


function App() {
 

  return (
 <Routes>
  <Route path='/' element={<HomePage/>}></Route>
  <Route path='checkout' element={<CheckoutPage/>}></Route>
  <Route path='tracking' element={<TrackingPage/>}></Route>
  <Route path='orders' element={<OrdersPage/>}></Route>

 </Routes>
   
  )
}

export default App
