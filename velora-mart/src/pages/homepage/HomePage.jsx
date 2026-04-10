import Header from "../../components/Header";
import "./HomePage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "./ProductsGrid";


const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try{
        const response = await axios.get(`/api/products`);
      console.log(response)
      setProducts( response.data)
      } catch(err) {
        console.error(`err`, err)

      }
    };

  
    getProducts();
  
  }, []);

  return (
    <div>
      <link rel="icon" type="image/svg+xml" href="/home-favicon.png" />

      <Header />

      <div className="home-page">
        <ProductsGrid products={products}/>
       
      </div>
    </div>
  );
};

export default HomePage;
