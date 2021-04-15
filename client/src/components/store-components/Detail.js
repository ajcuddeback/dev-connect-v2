import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Button, Box, Text, Heading, Image } from "gestalt";

import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";

const Detail = () => {
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product.id === id));
    }
  }, [products, id]);

  return (
    <>
      {currentProduct ? (
        <Box marginTop={2} marginLeft={8}>
          <Link to="/">← Back to Products</Link>
          <Heading>{currentProduct.product_name}</Heading>
          <Text>
            <Text>Textrice:</Text>${currentProduct.price}{" "}
            <Button text="Add to Cart"></Button>
            <Button text="Remove from Cart"></Button>
          </Text>
          <Image
            src={`/images/${currentProduct.imgPath}`}
            alt={currentProduct.name}
          />
        </Box>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
};

export default Detail;
