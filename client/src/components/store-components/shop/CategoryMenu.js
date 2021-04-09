import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CATEGORIES } from "../../../utils/queries";
import styled from "styled-components";

function CategoryMenu({ setCategory }) {
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const categories = categoryData?.categories || [];

  return (
    <StyledCategory>
      <div>
        <h2>Choose a Category:</h2>
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setCategory(item.id);
            }}
          >
            {item.category_name}
          </button>
        ))}
      </div>
    </StyledCategory>
  );
}
const StyledCategory = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
export default CategoryMenu;
