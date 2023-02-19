import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  clearAllCart,
  removeProduct,
  decreaseCartQuantity,
  increaseCartQuantity,
  getTotals,
} from "../redux/cartRedux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;

  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  ${mobile({ fontSize: "12px" })}
`;

const ProductId = styled.span`
  ${mobile({ fontSize: "12px" })}
`;

const ProductSize = styled.span`
  ${mobile({ fontSize: "12px" })}
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const DeleteIconConteiner = styled.div`
  margin-bottom: auto;
  margin-top: 14px;
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearAllCart());
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart.products]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/products"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText
              onClick={() => {
                handleClearCart();
              }}
            >
              Clear Shopping Bag
            </TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" style={{ visibility: "hidden" }}>
            CHECKOUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product, key) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.image} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>

                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>

                <PriceDetail>
                  <DeleteIconConteiner>
                    <MdDeleteOutline
                      onClick={() => {
                        dispatch(removeProduct(product));
                      }}
                      size={30}
                    />
                  </DeleteIconConteiner>
                  <ProductAmountContainer>
                    <Add
                      onClick={() => {
                        dispatch(increaseCartQuantity(product));
                      }}
                    />
                    <ProductAmount>{product.cartQuantity}</ProductAmount>
                    <Remove
                      onClick={() => {
                        dispatch(decreaseCartQuantity(product));
                      }}
                    />
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.cartQuantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
            {cart.products?.length == 0 ? (
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: "500",
                  textAlign: "center",
                  marginTop: "24px",
                }}
              >
                Your cart is empty to fill your cart go shopping now
              </p>
            ) : null}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.cartTotalAmount}</SummaryItemPrice>
            </SummaryItem>

            {cart.products?.length > 0 ? (
              <Link to="/checkout">
                <TopButton type="filled">CHECKOUT NOW</TopButton>
              </Link>
            ) : (
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
