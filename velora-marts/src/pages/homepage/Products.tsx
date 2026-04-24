import { formatMoney } from "../../utils/money";
import checkmark from "../../assets/images/icons/checkmark.png";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../../types/ecommerce";

interface ProductsProp {
  product: Product;
  getCartItems: () => void;
}

const Products = ({ product, getCartItems }: ProductsProp) => {
  const [quantity, setQuantity] = useState(1);
  const [showAdded, setShowAdded] = useState(false);
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [timerId]);

  const addToCart = async () => {
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
      });
      getCartItems();

      if (timerId) clearTimeout(timerId);
      console.log(timerId, "timer");

      setShowAdded(true);
      const timer = window.setTimeout(() => {
        setShowAdded(false);
      }, 2000);

      setTimerId(timer);
    } catch (error) {
      console.error("failed to add product:", error);
    }
  };

  return (
    <div
      data-testid="product-container"
      className="flex flex-col border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg rounded-sm"
    >
      <div className="mb-4 flex h-40 items-center justify-center">
        <img
          className="max-h-full max-w-full object-contain"
          data-testid="product-image"
          src={product.image}
          alt={product.name}
        />
      </div>

      <div className="mb-2 h-10 text-sm font-medium leading-tight text-gray-900 line-clamp-2">
        {product.name}
      </div>

      <div className="mb-2 flex items-center gap-1">
        <img
          className="w-20 object-contain"
          data-testid="product-rating-stars"
          src={`images/ratings/rating-${(product.rating?.stars ?? 0) * 10}.png`}
        />
        <div
          className="product-rating-count link-primary "
          data-testid="product-rating-count"
        >
          {product.rating?.count ?? 0}
        </div>
      </div>

      <div className="mb-3 text-base font-bold text-gray-900">
        {formatMoney(product.priceCents)}
      </div>

      <div className="mb-4">
        <select
          name="quantity"
          className=" rounded-md border border-gray-300 bg-gray-50 p-1.5 text-sm cursor-pointer focus:border-yellow-500! focus:ring-2! focus:ring-yellow-200! outline-none! transition-all"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="grow"></div>

      {/* Added notification message */}
      <div
        className={`mb-2 flex items-center gap-1 text-green-600 text-xs font-medium transition-all duration-300 transform ${
          showAdded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        <img src={checkmark} className="w-3 h-3" />
        Added
      </div>

      <button
        data-testid="add-to-cart-button"
        onClick={addToCart}
        className="w-full rounded-full bg-yellow-400 py-2 text-sm font-medium text-black transition-colors hover:bg-yellow-500 active:bg-yellow-600 shadow-sm"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Products;
