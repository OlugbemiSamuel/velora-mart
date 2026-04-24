

import Products from "./Products";
import type { Product } from "../../types/ecommerce";

interface GridProps {
  products: Product[];
  getCartItems: () => void;
}

const ProductsGrid = ({ products, getCartItems }: GridProps) => {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:max-w-7xl mx-auto">
      {products.map((product) => (
        <Products
          key={product.id}
          product={product}
          getCartItems={getCartItems}
        />
      ))}
    </div>
  );
};

export default ProductsGrid;
