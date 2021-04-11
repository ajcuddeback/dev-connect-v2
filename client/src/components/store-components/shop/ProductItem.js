import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import styled from "styled-components";
import "gestalt/dist/gestalt.css";
import { Box, Image, Text, Card, Button } from "gestalt";

const ProductItem = ({ image, product_name, id, price, quantity }) => {
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
                naturalWidht={1}
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
            <Text bold size="xl">
              {product_name}
            </Text>
            <Text>
              <Link to={`/products/${id}`}> See Deatils</Link>
            </Text>

            <Text>
              {quantity} {pluralize("item", quantity)} in stock
            </Text>

            <Text bold size="xl" color="watermelon">
              ${price}
            </Text>
          </Box>

          <Button color="blue" text="Add to cart"></Button>
        </Card>
      </Box>
    </Box>
  );
};

// const StyledItem = styled.div`
//   /* display: flex;
//   height: 100vh;
//   width: 100%;
//   justify-content: center; */
//   align-items: center;
// `;
export default ProductItem;
