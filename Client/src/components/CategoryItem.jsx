import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import React from "react";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  &:hover {
    box-shadow: 8px 8px 8px 8px lightgray;
    transition: 1s;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "32vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
  &:hover {
    background-color: transparent;
    transition: 1s;
    color: black;
  }
`;

const Button = styled.button`
  border: none;
  padding: 18px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: transparent;
    transition: 1s;
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.category}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.name}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default React.memo(CategoryItem);
