import styled from "styled-components";
import { useEffect } from "react";
import Product from "./Product";
import React, { useState } from "react";
import { publicRequest } from "../requestMethods";
import Loader from "./Shared/Loader";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const NewestProducts = () => {
  //Create array for products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //Fetch when cat has changed getProducts from api
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get(`products?new="ss`);
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <Container>
      {loading == true ? (
        <Loader></Loader>
      ) : (
        products.map((item) => <Product item={item} key={item.id} />)
      )}
    </Container>
  );
};

export default React.memo(NewestProducts);
