import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "./ProductsGrid";
import { useNavigate, useSearchParams } from "react-router";
import type { CartItem, Product } from "../../types/ecommerce";

interface HomePageProps {
  carts: CartItem[];
  getCartItems: () => void;
}

const HomePage = ({ carts, getCartItems }: HomePageProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  

  const searchInput = searchParams.get('search');

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const urlPath = searchInput ? `/api/products?search=${searchInput}` : '/api/products'
      const response = await axios.get(urlPath);
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.error(`err`, err);
    } finally{
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchInput]);

  return (
    <div className="min-h-screen bg-gray-100">
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header carts={carts} />


      <main className="mx-auto max-w-7xl px-4 py-8">
        {/*Empty State */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-3xl">Loading Products.....</div>
          </div>
        ) : products.length > 0 ? (
          <div className="space-y-6">
            {searchInput && (
              <h2 className="text-2xl font-bold text-gray-800">
                Results for "{searchInput}"
              </h2> 
            )}
            <ProductsGrid getCartItems={getCartItems} products={products} />
          </div>
        ) : (
          <div className="flex h-64 flex-col items-center justify-center text-center">
            <p className="text-xl font-semibold text-gray-600">No products found.</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear search and view all products
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
