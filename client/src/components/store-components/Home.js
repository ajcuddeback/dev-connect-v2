import React, { useState } from "react";
import ProductList from "./shop/ProductList";
import CategoryMenu from "./shop/CategoryMenu";
import Cart from "./shop/Cart";
import "gestalt/dist/gestalt.css";
import { Box, Heading, Card } from "gestalt";

const Home = () => {
  const [currentCategory, setCurrentCategory] = useState("");
  const [cartItems, setCartItems] = useState([]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop={4}
      direction="column"
      dangerouslySetInlineStyle={{
        __style: {
          flexWrap: "wrap-reverse",
        },
      }}
    >
      <CategoryMenu setCurrentCategory={setCurrentCategory} />
      <Box display="flex" justifyContent="around"></Box>
      <ProductList
        currentCategory={currentCategory}
        setCartItems={setCartItems}
        cartItems={cartItems}
      />
      <Box display="flex" justifyContent="around"></Box>
      <Cart cartItems={cartItems} />
    </Box>
  );
};

export default Home;
