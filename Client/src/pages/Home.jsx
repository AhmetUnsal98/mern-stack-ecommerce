import React from "react";
import Categories from "../components/Categories";
import Newsletter from "../components/Newsletter";
import NewestProducts from "../components/NewestProducts";
import Slider from "../components/Slider";
import styled from "styled-components";
import MainLayout from "../layouts/MainLayout";
const Header = styled.h1`
  font-size: "14px";
  color: black;
  font-weight: 600;
  text-align: center;
`;

const Home = () => {
  return (
    <MainLayout>
      <Slider />
      <Categories />
      <Header>Newest Products</Header>
      <NewestProducts />
      <Newsletter />
    </MainLayout>
  );
};

export default Home;
