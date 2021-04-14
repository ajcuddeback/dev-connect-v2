import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import { QUERY_PRODUCTS } from "../../../utils/queries";

import "gestalt/dist/gestalt.css";
import { Box, Image, Text, Card, Button, ButtonGroup } from "gestalt";

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
  function removeFromCart() {
    setCartItems((cartItems) => {
      const indexOfItemToRemove = cartItems.findIndex(
        (cartItem) => cartItem.id === cartItems.id
      );
      if (indexOfItemToRemove === -1) {
        return cartItems;
      }

      return [
        ...cartItems.slice(0, indexOfItemToRemove),
        ...cartItems.slice(indexOfItemToRemove + 1),
      ];
    });
  }

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
          <Box flex="grow" paddingX={3} paddingY={3}>
            <Box
              justifyContent="end"
              marginStart={-1}
              marginEnd={-1}
              marginTop={-1}
              marginBottom={-1}
              display="flex"
              wrap
            >
              <Box paddingX={1} paddingY={1}>
                <Button
                  inline
                  size="sm"
                  onClick={addToCart}
                  color="red"
                  text="To Cart"
                ></Button>{" "}
              </Box>
              <Box paddingX={1} paddingY={1}>
                <Button
                  size="sm"
                  text="Remove"
                  onClick={removeFromCart}
                  inline
                />
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}

export default ProductItem;
