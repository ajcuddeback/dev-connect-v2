import React, { useState } from "react";
import ProductList from "./shop/ProductList";
import CategoryMenu from "./shop/CategoryMenu";

const Home = () => {
  const [currentCategory, setCategory] = useState("");

  return (
    <div className="container">
      <CategoryMenu setCategory={setCategory} />
      <ProductList currentCategory={currentCategory} />
    </div>
  );
};

export default Home;
