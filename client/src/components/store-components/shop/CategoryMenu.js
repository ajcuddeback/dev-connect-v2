import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CATEGORIES } from "../../../utils/queries";
import "gestalt/dist/gestalt.css";
import { Box, Heading, Button } from "gestalt";

function CategoryMenu({ setCategory }) {
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = categoryData?.categories || [];

  return (
    <Box display="flex" justifyContent="center" alignItems="start">
      <Heading color="mignight">Choose a Category:</Heading>
      {categories.map((item) => (
        <Box>
          <Box
            display="flex"
            alignItems="sart"
            justifyContent="center"
            marginTop={2}
            padding={1}
          >
            <Button
              color="blue"
              text={item.category_name}
              key={item.id}
              onClick={() => {
                setCategory(item.id);
              }}
            >
              {item.category_name}
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default CategoryMenu;
