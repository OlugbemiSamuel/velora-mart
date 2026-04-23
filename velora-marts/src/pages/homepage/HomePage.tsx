import Header from "../../components/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "./ProductsGrid";
import { useSearchParams } from "react-router";
import type { CartItem, Product } from "../../types/ecommerce";

interface HomePageProps {
  carts: CartItem[];
  getCartItems: () => void;
}

const HomePage = ({ carts, getCartItems }: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  

  const searchInput = searchParams.get('search');

  const getProducts = async () => {
    try {
      const urlPath = searchInput ? `/api/products?search=${searchInput}` : '/api/products'
      const response = await axios.get(urlPath);
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.error(`err`, err);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchInput]);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header carts={carts} />

      <div className="home-page">
        <ProductsGrid getCartItems={getCartItems} products={products} />
      </div>
    </div>
  );
};

export default HomePage;
