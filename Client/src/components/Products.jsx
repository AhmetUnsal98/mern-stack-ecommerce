import styled from "styled-components";
import React, { useEffect } from "react";
import Product from "./Product";
import { useState } from "react";
import { getAllProducts, getProductsByCategory } from "../api/fetchAPI";
import Loader from "./Shared/Loader";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ cat, filters, sort }) => {
  const [loading, setLoading] = useState(true);
  //Create array for products
  const [products, setProducts] = useState([]);
  //Create array for filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);
  //Fetch when cat has changed getProducts from api
  useEffect(() => {
    const fetch = async () => {
      try {
        if (cat === undefined) {
          console.log(cat);
          await getAllProducts().then(function (result) {
            setProducts(result);
            setLoading(false);
          });
        } else {
          await getProductsByCategory(cat).then(function (result) {
            setProducts(result);
            setLoading(false);
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [cat, filters]);
  //Filter products by category , filters
  useEffect(() => {
    filters &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  //Set filter sort
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {loading == true ? (
        <Loader></Loader>
      ) : filters ? (
        filteredProducts.map((item) => <Product item={item} key={item._id} />)
      ) : (
        products.map((item) => <Product item={item} key={item._id} />)
      )}
    </Container>
  );
};

export default React.memo(Products);
