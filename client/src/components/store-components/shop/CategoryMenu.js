import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CATEGORIES } from "../../../utils/queries";
import "gestalt/dist/gestalt.css";
import { Box, Heading, Button } from "gestalt";

function CategoryMenu({ setCurrentCategory }) {
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = categoryData?.categories || [];

  return (
    <Box display="flex" margin={2} justifyContent="center" alignItems="center">
      <Heading
        color="midnight"
        size="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        Filters:
      </Heading>
      {categories.map((item) => (
        <Button
          text="small"
          padding={5}
          color="blue"
          text={item.category_name}
          key={item.id}
          onClick={() => {
            setCurrentCategory(item.id);
          }}
        >
          {item.category_name}
        </Button>
      ))}
    </Box>
  );
}

export default CategoryMenu;
