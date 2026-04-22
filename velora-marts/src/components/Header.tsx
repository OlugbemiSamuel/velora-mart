import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import logowhite from "../assets/images/logo-white.png";
import mobileLogo from "../assets/images/mobile-logo-white.png";
import carticon from "../assets/images/icons/cart-icon.png";
import searchicon from "../assets/images/icons/search-icon.png";
import { calculateCartQuantity } from "../utils/cartUtils";
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
    <div className="header">
      <div className="left-section">
        <NavLink to="/" className="header-link">
          <img className="logo" src={logowhite} />
          <img className="mobile-logo" src={mobileLogo} />
        </NavLink>
      </div>

      <form onSubmit={HandleSearch} className="middle-section">
        <input
          value={searchInput}
          onChange={onSearch}
          className="search-bar"
          type="text"
          placeholder="Search"
        />

        <button type="submit" className="search-button">
          <img className="search-icon" src={searchicon} />
        </button>
      </form>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders">
          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout">
          <img className="cart-icon" src={carticon} />
          <div className="cart-quantity">{totalCartItems}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
