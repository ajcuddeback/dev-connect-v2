import React from "react";
import { Link } from "react-router-dom";
import { pluralize } from "../../../utils/helpers";
import styled from "styled-components";

function ProductItem(item) {
  const { imgPath, product_name, id, price, quantity } = item;

  return (
    <StyledItem>
      <div className="card px-1 py-1">
        <Link to={`/products/${id}`}>
          <img alt={product_name} src={`/images/${imgPath}`} />
          <p>{product_name}</p>
        </Link>
        <div>
          <div>
            {quantity} {pluralize("item", quantity)} in stock
          </div>
          <span>${price}</span>
        </div>
        <button>Add to cart</button>
      </div>
    </StyledItem>
  );
}

const StyledItem = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export default ProductItem;
