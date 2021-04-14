import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CATEGORIES } from "../../../utils/queries";
import { QUERY_PRODUCTS } from "../../../utils/queries";
import "gestalt/dist/gestalt.css";
import { Box, Heading, Button } from "gestalt";
import { Link } from "react-router-dom";

function CategoryMenu({ currentCategory, setCurrentCategory }) {
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = categoryData?.categories || [];
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const products = data?.allProducts || [];
  function filterProduct() {
    setCurrentCategory(currentCategory);
  }

  return (
    <Box display="flex" margin={2} justifyContent="center" alignItems="center">
      {categories.map((item) => (
        <Button
          size="md"
          text="small"
          padding={5}
          inline
          color="transparent"
          text={item.category_name}
          key={item.id}
          onClick={() => {
            setCurrentCategory(item.id);
          }}
        >
          {item.category_name}
        </Button>
      ))}
      <button class="glass-button" onClick={filterProduct}>
        Reset Filters:
      </button>
    </Box>
  );
}

export default CategoryMenu;
