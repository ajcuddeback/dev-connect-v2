import React, { useState } from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import Detail from "../Detail";
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
      id: id,
      product_name: product_name,
      price: price,
      image: image,
    };

    let cartProducts = cartItems;
    let productArr = [];
    if (cartProducts.length === 0) {
      productArr.push(product);
      setCartItems(productArr);
    } else {
      productArr.push(...cartProducts);
      productArr.push(product);
      console.log(product);
      setCartItems(productArr);
    }
  }
  function handleRemove(id) {
    const newList = cartItems.filter((item) => item.id !== id);

    setCartItems(newList);
  }
  // function removeFromCart() {
  //   const product = {
  //     id: id,
  //   };
  //   setCartItems((cartItems) => {
  //     const indexOfItemToRemove = cartItems.findIndex(
  //       (cartItem) => cartItem.id === product.id
  //     );
  //     if (indexOfItemToRemove === -1) {
  //       return cartItems;
  //     }

  //     return [
  //       ...cartItems.slice(0, indexOfItemToRemove),
  //       ...cartItems.slice(indexOfItemToRemove + 1),
  //     ];
  //   });
  // }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box key={id} margin={2} width={200}>
        
            <Box height={200} width={200}>
              <Image
                alt={product_name}
                naturalWidth={1}
                naturalHeight={1}
                src={`/images/${image}`}
              />
            </Box>
          
        
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
                  onClick={() => handleRemove(id, price)}
                  inline
                />
              </Box>
            </Box>
          </Box>
      </Box>
    </Box>
  );
}

export default ProductItem;
