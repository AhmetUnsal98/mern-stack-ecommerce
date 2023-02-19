import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Announcement from "../components/Announcement";
import styled from "styled-components";
import { mobile } from "../responsive";
import { userRequest } from "../requestMethods";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
const Conteiner = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
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
const UserOrders = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [orders, setOrder] = useState();
  const userId = user._id;

  useEffect(() => {
    const getUserOrder = async () => {
      const res = await userRequest.get("/orders/find/" + userId);
      console.log(res.data);
      setOrder(res.data);
    };
    getUserOrder();
  }, []);

  return (
    <Conteiner>
      <Announcement />
      <Navbar />

      <OrderRow>
        <OrderRowBox>
          <OrderRowText>Products</OrderRowText>
        </OrderRowBox>
        <OrderRowBox>
          <OrderRowText>Address</OrderRowText>
        </OrderRowBox>
        <OrderRowBox>
          <OrderRowText>Amount</OrderRowText>
        </OrderRowBox>
        <OrderRowBox>
          <OrderRowText>Status</OrderRowText>
        </OrderRowBox>
        <OrderRowBox>
          <OrderRowText>Proccess</OrderRowText>
        </OrderRowBox>
      </OrderRow>
      {orders?.map((order) => (
        <OrderRow>
          <OrderRowBox>
            <OrderRowText>
              {order.products?.map((product) => (
                <p style={{ borderBottom: "1px solid black" }}>
                  {product.title}
                </p>
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
      ))}
      <Footer />
    </Conteiner>
  );
};

export default UserOrders;
