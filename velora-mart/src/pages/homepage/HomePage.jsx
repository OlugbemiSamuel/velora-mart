import Header from "../../components/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "./ProductsGrid";


const HomePage = ({carts, getCartItems}) => {
  const [products, setProducts] = useState([]);


    const getProducts = async () => {
      try{
        const response = await axios.get(`/api/products`);
      console.log(response)
      setProducts( response.data)
      } catch(err) {
        console.error(`err`, err)

      }
    };

  useEffect(() => {
  

  
    getProducts();
  
  }, []);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header carts={carts} />

      <div className="home-page">
        <ProductsGrid  getCartItems={getCartItems} products={products}/>
       
      </div>
    </div>
  );
};

export default HomePage;
