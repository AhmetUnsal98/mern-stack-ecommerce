import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import MainLayout from "../layouts/MainLayout";
import { getUserOrders } from "../api/fetchAPI";
import Order from "../components/Order";
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
const UserOrders = () => {
  const user = useSelector((state) => state.user.currentUser);

  const [orders, setOrder] = useState();
  const userId = user._id;

  useEffect(() => {
    const fetch = async () => {
      await getUserOrders(userId).then(function (result) {
        setOrder(result);
      });
    };
    fetch();
  }, []);

  return (
    <MainLayout>
      <Conteiner>
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
          <Order order={order} />
        ))}
      </Conteiner>
    </MainLayout>
  );
};

export default UserOrders;
