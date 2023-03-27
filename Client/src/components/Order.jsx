import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
const OrderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10vh;
  border: 1px solid lightgray;
`;
const OrderRowBox = styled.div`
  flex: 1;
`;
const OrderRowText = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 500;
  color: black;
  ${mobile({ fontSize: "10px" })}
`;
const Button = styled.button`
  background-color: transparent;
  border: 1px solid red;
  padding: 10px;
  border-radius: 2px;
  color: red;
  &:hover {
    background-color: red;
    color: white;
    transition: 1s;
  }
`;
const Order = ({ order }) => {
  return (
    <OrderRow>
      <OrderRowBox>
        <OrderRowText>
          {order.products?.map((product) => (
            <p style={{ borderBottom: "1px solid black" }}>{product.title}</p>
          ))}
        </OrderRowText>
      </OrderRowBox>
      <OrderRowBox>
        <OrderRowText>{order.address}</OrderRowText>
      </OrderRowBox>
      <OrderRowBox>
        <OrderRowText>{order.amount}$</OrderRowText>
      </OrderRowBox>
      <OrderRowBox>
        <OrderRowText>{order.status}</OrderRowText>
      </OrderRowBox>
      <OrderRowBox>
        <OrderRowText>
          <Button>Cancel</Button>
        </OrderRowText>
      </OrderRowBox>
    </OrderRow>
  );
};

export default Order;
