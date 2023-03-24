import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import { publicRequest } from "../requestMethods";
import React, { useState, useEffect } from "react";
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
    const getCategories = async () => {
      try {
        const res = await publicRequest.get("/categories");
        setCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
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
