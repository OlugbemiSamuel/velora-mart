import { Link, NavLink } from 'react-router';
import './header.css'
import logowhite from '../assets/images/logo-white.png'
import mobileLogo from '../assets/images/mobile-logo-white.png'
import carticon from '../assets/images/icons/cart-icon.png'
import searchicon from '../assets/images/icons/search-icon.png'
import { calculateCartQuantity } from '../utils/cartutils';
import { useMemo } from 'react';



const Header = ({carts}) => {


  const totalCartItems = useMemo(() => calculateCartQuantity(carts), [carts] )
    return(
           <div class="header">
      <div class="left-section">
        <NavLink to="/" class="header-link">
          <img class="logo"
            src={logowhite} />
          <img class="mobile-logo"
            src={mobileLogo}/>
        </NavLink>
      </div>

      <div class="middle-section">
        <input class="search-bar" type="text" placeholder="Search" />

        <button class="search-button">
          <img class="search-icon" src={searchicon} />
        </button>
      </div>

      <div class="right-section">
        <Link class="orders-link header-link" to="/orders" >
          <span class="orders-text">Orders</span>
        </Link>

        <Link class="cart-link header-link" to="/checkout">
          <img class="cart-icon" src={carticon} />
          <div class="cart-quantity">{totalCartItems}</div>
          <div class="cart-text">Cart</div>
        </Link>
      </div>
    </div>
    )
};

export default Header