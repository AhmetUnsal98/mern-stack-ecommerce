import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import NewestProducts from "../components/NewestProducts";
import Slider from "../components/Slider";
import styled from "styled-components";
import { mobile } from "../responsive";
const Header = styled.h1`
  font-size: "14px";
  color: black;
  font-weight: 600;
  text-align: center;
`;

const Home = () => {
  return (
    <div style={{}}>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <Header>Newest Products</Header>
      <NewestProducts />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
