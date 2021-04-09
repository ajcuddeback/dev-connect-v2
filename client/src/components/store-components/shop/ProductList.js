import React from "react";
import { useQuery } from "@apollo/react-hooks";

import ProductItem from "./ProductItem";
import { QUERY_PRODUCTS } from "../../../utils/queries";
import spinner from "../../../assets/spinner.gif";

function ProductList({ currentCategory }) {
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.products || [];

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }

    return products.filter(
      (product) => product.category_id === currentCategory
    );
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product.id}
              id={product.id}
              image={product.imgPath}
              product_name={product.product_name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
