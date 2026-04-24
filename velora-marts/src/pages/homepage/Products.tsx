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
    <div data-testId="product-container" className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testId="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines ">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testId="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div
          className="product-rating-count link-primary "
          data-testId="product-rating-count"
        >
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{formatMoney(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div
        className={`flex items-center gap-1 text-green-600 font-medium transition-all duration-300 ${
          showAdded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <img src={checkmark} className="w-5 h-5" />
        <span>Added</span>
      </div>

      <button
        data-testId="add-to-cart-button"
        onClick={addToCart}
        className="add-to-cart-button button-primary"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Products;
