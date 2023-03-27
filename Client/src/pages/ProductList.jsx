import React, { useEffect } from "react";
import styled from "styled-components";
import Products from "../components/Products";
import { publicRequest } from "../requestMethods";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;

  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ClearFilterButtonText = styled.span``;

const ClearFilter = styled.button`
  background-color: transparent;
  width: auto;
  height: 26px;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
    transition: 0.5s;
  }
`;

const ProductList = () => {
  const location = useLocation();

  //Spiliting after slash and take category pathname to cat variable
  const cat = location.pathname.split("/")[2];

  const [filters, setFilters] = useState({});

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

  //Created a new useState filters and adding filters params that we ve taken from client side to the array
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  //Set clear all filters
  const handleClearFilter = () => {
    setFilters({});
  };

  const [sort, setSort] = useState("newest");

  return (
    <MainLayout>
      <Container>
        {cat && <Title>{cat.toUpperCase()}</Title>}
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>

            <Select name="categories" onChange={handleFilters}>
              <Option value="">Select Category</Option>
              {categories?.map((item) => (
                <Option value={item.category} key={item._id}>
                  {item.name}
                </Option>
              ))}
            </Select>

            <Select name="color" onChange={handleFilters}>
              <Option value="">Select Color</Option>
              <Option value="white">White</Option>
              <Option value="black">Black</Option>
              <Option value="red">Red</Option>
              <Option value="blue">Blue</Option>
              <Option value="yellow">Yellow</Option>
              <Option value="green">Green</Option>
            </Select>

            <Select name="size" onChange={handleFilters}>
              <Option value="">Select Size</Option>
              <Option value="xs">XS</Option>
              <Option value="s">S</Option>
              <Option value="m">M</Option>
              <Option value="l">L</Option>
              <Option value="xl">XL</Option>
            </Select>

            <ClearFilter>
              <ClearFilterButtonText onClick={handleClearFilter}>
                Clear All Filters
              </ClearFilterButtonText>
            </ClearFilter>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>

        <Products cat={cat} filters={filters} sort={sort} />
      </Container>
    </MainLayout>
  );
};

export default ProductList;
