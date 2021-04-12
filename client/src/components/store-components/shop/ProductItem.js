import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import styled from "styled-components";
import "gestalt/dist/gestalt.css";
import { Box, Image, Text, Card, Button } from "gestalt";

function ProductItem({
  image,
  product_name,
  id,
  price,
  quantity,
  setCartItems,
  cartItems,
}) {
  function addToCart() {
    const product = {
      product_name: product_name,
      price: price,
      image: image,
    };

    let cartProducts = cartItems;
    let productArr = [];
    if (cartProducts.length < 1) {
      productArr.push(product);
      setCartItems(productArr);
    } else {
      productArr.push(...cartProducts);
      productArr.push(product);

      setCartItems(productArr);
    }
  }
  console.log(image);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box key={id} margin={2} width={200}>
        <Card
          image={
            <Box height={200} width={200}>
              <Image
                alt={product_name}
                naturalWidth={1}
                naturalHeight={1}
                src={`/images/${image}`}
              />
            </Box>
          }
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <Text bold size="lg">
              {product_name}
            </Text>
            <Text>
              <Link to={`/products/${id}`}> See Deatils</Link>
            </Text>

            <Text>
              {quantity} {pluralize("item", quantity)} in stock
            </Text>

            <Text bold size="lg" color="watermelon">
              ${price}
            </Text>
          </Box>

          <Button onClick={addToCart} color="blue" text="Add to cart"></Button>
        </Card>
      </Box>
    </Box>
  );
}

export default ProductItem;
