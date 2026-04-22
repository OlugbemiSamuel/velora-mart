import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import logowhite from "../assets/images/logo-white.png";
import mobileLogo from "../assets/images/mobile-logo-white.png";
import carticon from "../assets/images/icons/cart-icon.png";
import searchicon from "../assets/images/icons/search-icon.png";
import { calculateCartQuantity } from "../utils/cartutils";
import { useMemo, useState } from "react";

const Header = ({ carts }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [searchInput, setSearchInput] = useState(searchText || "");

  const onSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const HandleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchInput}`);

  };

  const totalCartItems = useMemo(() => calculateCartQuantity(carts), [carts]);
  return (
    <div class="header">
      <div class="left-section">
        <NavLink to="/" class="header-link">
          <img class="logo" src={logowhite} />
          <img class="mobile-logo" src={mobileLogo} />
        </NavLink>
      </div>

      <form onSubmit={HandleSearch} class="middle-section">
        <input
          value={searchInput}
          onChange={onSearch}
          class="search-bar"
          type="text"
          placeholder="Search"
        />

        <button type="submit" class="search-button">
          <img class="search-icon" src={searchicon} />
        </button>
      </form>

      <div class="right-section">
        <Link class="orders-link header-link" to="/orders">
          <span class="orders-text">Orders</span>
        </Link>

        <Link class="cart-link header-link" to="/checkout">
          <img class="cart-icon" src={carticon} />
          <div class="cart-quantity">{totalCartItems}</div>
          <div class="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
