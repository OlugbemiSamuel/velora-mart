

import Products from "./Products";

const ProductsGrid = ({ products, getCartItems }) => {

 

  return (
    <div className="products-grid">
      {products.map((product) => {
        return (
          <Products key={product.id} product={product} getCartItems={getCartItems}/>
         
        );
      })}
    </div>
  );
};

export default ProductsGrid;
