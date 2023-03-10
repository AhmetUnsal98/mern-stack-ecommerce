import styled from "styled-components";
import { useEffect } from "react";
import Product from "./Product";

import { useState } from "react";
import { userRequest } from "../requestMethods";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const NewestProducts = () => {
  //Create array for products
  const [products, setProducts] = useState([]);

  //Fetch when cat has changed getProducts from api
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await userRequest.get(`products?new="ss`);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      {products.map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default NewestProducts;
