import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import React, { useState, useEffect } from "react";
import { getCategories } from "../api/fetchAPI";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${mobile({
    padding: "0px",
    display: "flex",
    flexDirection: "column",
  })}
`;

const Categories = () => {
  const [categories, setCategory] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        await getCategories().then(function (result) {
          setCategory(result);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <Container>
      {categories?.map((item) =>
        item.isInHome != "false" ? (
          <CategoryItem item={item} key={item._id} />
        ) : null
      )}
    </Container>
  );
};

export default React.memo(Categories);
