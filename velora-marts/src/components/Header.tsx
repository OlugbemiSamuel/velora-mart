import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import "./header.css";
import logowhite from "../assets/images/logo-white.png";
import mobileLogo from "../assets/images/mobile-logo-white.png";
import carticon from "../assets/images/icons/cart-icon.png";
import searchicon from "../assets/images/icons/search-icon.png";
import { calculateCartQuantity } from "../utils/cartUtils";
import { useMemo, useState, type ChangeEvent } from "react";
import type { CartItem } from "../types/ecommerce";

interface HeaderProps {
  carts: CartItem[];
}

const Header = ({ carts }: HeaderProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search");
  const [searchInput, setSearchInput] = useState(searchText || "");

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const HandleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/?search=${searchInput}`);
  };

  const totalCartItems = useMemo(() => calculateCartQuantity(carts), [carts]);
  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* LEFT SECTION: Logo */}
        <div className="flex shrink0 items-center">
          <NavLink to="/" className="transition-opacity hover:opacity-80">
            <img
              className="hidden h-8 w-auto md:block"
              src={logowhite}
              alt="Logo"
            />
            <img
              className="block h-8 w-auto md:hidden"
              src={mobileLogo}
              alt="Mobile Logo"
            />
          </NavLink>
        </div>

        {/* MIDDLE SECTION: Search */}
        <form
          onSubmit={HandleSearch}
          className="mx-4 flex max-w-2xl flex-1 items-center overflow-hidden rounded-lg bg-white"
        >
          <input
            value={searchInput}
            onChange={onSearch}
            className="w-full border-none px-4 py-2 text-gray-900 focus:ring-0 outline-none placeholder:text-gray-500"
            type="text"
            placeholder="Search products..."
          />
          <button
            type="submit"
            className="flex h-10 w-12 items-center justify-center bg-yellow-400 transition-colors hover:bg-yellow-500 active:bg-yellow-600"
          >
            <img className="h-5 w-5" src={searchicon} alt="Search" />
          </button>
        </form>

       {/* RIGHT SECTION: Navigation */}
        <div className="flex items-center gap-6">
          <Link 
            className=" text-sm sm:text-base font-medium transition-colors hover:text-yellow-400 sm:block" 
            to="/orders"
          >
            Orders
          </Link>

          <Link 
            className="relative flex items-center gap-1 transition-transform active:scale-95" 
            to="/checkout"
          >
            <div className="relative">
              <img className="h-9 w-9" src={carticon} alt="Cart" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-black ring-2 ring-slate-900">
                  {totalCartItems}
                </span>
              )}
            </div>
            <span className="hidden text-sm sm:text-base font-bold sm:block">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
