import styled from "styled-components";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import React, { useState, useEffect } from "react";
import { getCategories } from "../api/fetchAPI";
import Loader from "./Shared/Loader";
const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: center;
  align-items: center;
  ${mobile({
    padding: "0px",
    display: "flex",
    flexDirection: "column",
  })}
`;

const Categories = () => {
  const [categories, setCategory] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        await getCategories().then(function (result) {
          setCategory(result);
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  return (
    <Container>
      {loading == true ? (
        <Loader></Loader>
      ) : (
        categories?.map((item) =>
          item.isInHome != "false" ? (
            <CategoryItem item={item} key={item._id} />
          ) : null
        )
      )}
    </Container>
  );
};

export default React.memo(Categories);
