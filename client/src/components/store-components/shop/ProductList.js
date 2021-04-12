import React from "react";
import { useQuery } from "@apollo/react-hooks";
// import styled from "styled-components";
import "gestalt/dist/gestalt.css";
import { Box, Heading } from "gestalt";

import ProductItem from "./ProductItem";
import { QUERY_PRODUCTS } from "../../../utils/queries";

const ProductList = ({ currentCategory, setCartItems, cartItems }) => {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.allProducts || [];

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category.id === currentCategory
    );
  }

  if (loading) {
    return (
      <>
        <h2>Loading...</h2>
        <div className="loader"></div>
      </>
    );
  }

  return (
    // <StyledItem>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="start"
      marginTop={4}
      direction="column"
    >
      {products.length ? (
        <Box
          dangerouslySetInlineStyle={{
            __style: { backgroundColor: "#bdcdd9" },
          }}
          wrap
          shape="rounded"
          display="flex"
          justifyContent="center"
          padding={4}
        >
          {filterProducts().map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              image={product.imgPath}
              product_name={product.product_name}
              price={product.price}
              quantity={product.quantity}
              setCartItems={setCartItems}
              cartItems={cartItems}
            />
          ))}
        </Box>
      ) : (
        <Heading>You haven't added any products yet!</Heading>
      )}
    </Box>
    // </StyledItem>
  );
};
// const StyledItem = styled.div`
//   display: flex;
//   height: 100vh;
//   width: 100%;
//   justify-content: center;
//   align-items: center;
// `;

export default ProductList;
