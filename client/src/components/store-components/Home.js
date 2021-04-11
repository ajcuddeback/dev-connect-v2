import React, { useState } from "react";
import ProductList from "./shop/ProductList";
import CategoryMenu from "./shop/CategoryMenu";
import Cart from "./shop/Cart";
import "gestalt/dist/gestalt.css";
import { Box, Heading, Card } from "gestalt";

const Home = () => {
  const [currentCategory, setCategory, cartItems] = useState("");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={4}
      direction="column"
    >
      <CategoryMenu setCategory={setCategory} />
      <Box display="flex" justifyContent="around"></Box>
      <ProductList currentCategory={currentCategory} />
      <Box display="flex" justifyContent="around"></Box>
      <Cart cartItems={cartItems} />
    </Box>
  );
};

export default Home;
