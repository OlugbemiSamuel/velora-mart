import { Link, NavLink } from 'react-router';
import './header.css'


const Header = () => {

    return(
           <div class="header">
      <div class="left-section">
        <NavLink to="/" class="header-link">
          <img class="logo"
            src="images/logo-white.png" />
          <img class="mobile-logo"
            src="images/mobile-logo-white.png" />
        </NavLink>
      </div>

      <div class="middle-section">
        <input class="search-bar" type="text" placeholder="Search" />

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png" />
        </button>
      </div>

      <div class="right-section">
        <NavLink class="orders-link header-link" to="/orders" >
          <span class="orders-text">Orders</span>
        </NavLink>

        <NavLink class="cart-link header-link" to="/checkout">
          <img class="cart-icon" src="images/icons/cart-icon.png" />
          <div class="cart-quantity">3</div>
          <div class="cart-text">Cart</div>
        </NavLink>
      </div>
    </div>
    )
};

export default Header