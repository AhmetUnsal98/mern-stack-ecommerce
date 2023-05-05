import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import Odemeimage from "../assets/odeme.png";
import Iyzicoimage from "../assets/iyzico.png";
import Sslimage from "../assets/ssl.png";
import { clearAllCart } from "../redux/cartRedux";
import { useHistory } from "react-router-dom";
import { useInputs } from "../hooks/useInputs";
import MainLayout from "../layouts/MainLayout";
import { paymentNormal, paymentThreeDs } from "../api/paymentAPI";
import { createOrder } from "../api/orderAPI";
import { CloseSharp } from "@material-ui/icons";
const Conteiner = styled.div`
  width: 100vw;
  height: auto;
  margin-bottom: 1rem;
`;
const Header = styled.h1`
  font-size: 44px;
  font-weight: 700;
  ${mobile({ fontSize: "24px" })}
`;
const Divider = styled.div`
  width: 90vw;
  border: 0.5px solid lightgray;
`;
const GeneralFormConteiner = styled.div`
  width: 95vw;
  height: auto;
  margin-top: 14px;
  margin-left: 24px;
  ${(props) => (props.bg === true ? "opacity:0.4" : "opacity:1")};
  ${mobile({ marginTop: "6px", marginLeft: "6px" })}
`;
const FormConteiner = styled.div`
  width: 95vw;
  height: auto;

  display: flex;
  flex-direction: row;
  ${mobile({ flexDirection: "column" })}
`;
const LeftConteiner = styled.div`
  width: 50%;
  height: auto;
  margin-top: 12px;
  ${mobile({ width: "100%" })}
`;
const RightConteiner = styled.div`
  width: 45%;
  height: auto;
  margin-top: 12px;
  margin-left: 24px;
  ${mobile({ width: "90%", marginLeft: "2px" })}
`;
const SummaryConteiner = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  padding: 2px;
  margin-top: 12px;
  ${mobile({ width: "auto" })}
`;
const CartConteiner = styled.div`
  width: 100%;
  height: auto;
`;
const ItemConteiner = styled.div`
  width: 100%;
  height: 40px;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${mobile({ height: "auto" })}
`;
const ItemText = styled.p`
  font-size: 18px;
  ${mobile({ fontSize: "12px" })}
`;
const BottomConteinerSummary = styled.div`
  width: 100%;
  height: 40px;
  border-top: 1px solid gray;
  ${mobile({ height: "auto" })}
`;
const TotalPriceText = styled.p`
  font-size: 24px;
  padding: 12px;
  color: black;
  ${mobile({ fontSize: "12px", padding: "4px" })}
`;
const InputConteiner = styled.div`
  height: auto;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin-top: 24px;

  ${mobile({ marginTop: "12px", width: "90%" })}
`;
const InputHeader = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 600;
`;
const Input = styled.input`
  height: 40px;
  border-radius: 8px;
  margin-top: 4px;
  border: 2px solid lightgray;
  ${mobile({ height: "35px", width: "90%" })}
`;
const InputAddress = styled.input`
  height: 40px;
  border-radius: 8px;
  margin-top: 4px;
  border: 2px solid lightgray;
  ${mobile({ height: "35px", width: "90vw" })}
`;
const HeaderOrderDetail = styled.h1`
  font-size: 26px;
  font-weight: 600;
  color: black;
  ${mobile({ fontSize: "18px" })}
`;
const PayButton = styled.button`
  background-color: #35b0fb;
  height: 60px;
  color: white;
  border: 0px;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    background-color: teal;
    transition: 2s;
  }
`;
const CountryCityZipConteiner = styled.div`
  ${mobile({ flexDirection: "column" })}
`;
const Error = styled.p`
  font-size: 16px;
  color: red;
`;
const Modal = styled.div`
  width: 50vw;
  height: 70vh;
  position: absolute;
  left: 25%;
  background-color: whitesmoke;
  z-index: 999;
  border-radius: 4px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  ${(props) => (props.open === true ? "display:flex" : "display:none")};
  ${mobile({ width: "95%", left: "0%" })}
`;
const UpperModal = styled.div`
  width: 100%;
  height: 10%;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  ${mobile({ width: "95%" })}
`;
const ModalHeader = styled.h3``;
const ModalFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  align-items: center;
  ${mobile({ alignItems: "flex-start" })}
`;
const ModalInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.5rem;
  ${mobile({ margin: "0.2rem" })}
`;
const ModalInputContainerExp = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0.5rem;
  ${mobile({ margin: "0.2rem", padding: "0" })}
`;
const ModalInputHeader = styled.span`
  font-weight: 550;
  color: gray;
  ${mobile({ fontSize: "12px" })}
`;
const ModalInput = styled.input`
  border: 2px solid lightgray;
  background-color: transparent;
  height: 42px;
  border-radius: 6px;
`;
const ModalInputExp = styled.input`
  border: 2px solid lightgray;
  background-color: transparent;
  height: 42px;
  border-radius: 6px;
  ${mobile({ width: "100px", height: "42px" })}
`;
const ModalRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 75%;
  justify-content: space-between;
  ${mobile({ width: "90%" })}
`;
const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const token = user.accessToken;
  const [inputs, setInputs] = useInputs({
    firstName: "",
    firstNameError: false,
    lastName: "",
    lastNameError: false,
    address: "",
    addressError: false,
    country: "",
    countryError: false,
    city: "",
    cityError: false,
    zipCode: "",
    zipCodeError: false,
    phone: "",
    phoneError: false,
    email: "",
    emailError: "",
    cardName: "",
    cardNameError: false,
    cardNumber: "",
    cardNumberError: false,
    expirationMonth: "",
    expirationMonthError: false,
    expirationYear: "",
    expirationYearError: false,
    cvc: "",
    cvcError: false,
    installment: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [installment, setInstallment] = useState();
  const [current, setCurrent] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [pageStart, setPageStart] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //Create a new Order
  const handleCreateOrder = async () => {
    const order = {
      userId: user._id,
      locale: "tr",
      products: cart.products,
      amount: cart.cartTotalAmount,
      address: inputs.address,
      status: "pending",
    };
    try {
      await createOrder(order).then(function (result) {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Get normal payment
  const handlePayment = async (e) => {
    const paymentInformations = {
      price: cart.cartTotalAmount,
      basketId: user ? user._id : "1231231",
      products: cart.products,
      paymentCard: {
        cardHolderName: inputs.cardName,
        cardNumber: inputs.cardNumber,
        expireMonth: inputs.expirationMonth,
        expireYear: inputs.expirationYear,
        cvc: inputs.cvc,
      },
      buyer: {
        id: user ? user._id : "1231231",
        name: inputs.firstName,
        surname: inputs.lastName,
        gsmNumber: inputs.phone,
        email: inputs.email,
        identityNumber: "0000000000000000000",
        lastLoginDate: "2020-10-05 12:43:45",
        registrationDate: "2020-10-04 12:43:45",
        registrationAddress: inputs.address,
        ip: "85.34.78.112" /* Kullanıcının IP adresi */,
        city: inputs.city /* Kullanıcının şehri */,
        country: inputs.country /* Kullanıcının ülkesi */,
        zipCode: inputs.zipCode,
      },
      shippingAddress: {
        contactName:
          inputs.firstName +
          " " +
          inputs.lastName /* Teslimat için Kullanıcının Adı */,
        city: inputs.city /* Teslimat için Kullanıcının Şehri */,
        country: inputs.country /* Teslimat için Kullanıcının Ülkesi */,
        address: inputs.address /* Teslimat için Kullanıcının Şehri */,
        zipCode: inputs.zipCode /* Teslimat için Kullanıcının Posta Kodu */,
      },
    };

    try {
      await paymentNormal(paymentInformations, token).then(function (result) {
        if (result.status === "success") {
          handleCreateOrder();
          dispatch(clearAllCart());
          history.push("/success");
        } else {
          alert("Please check your payment informations");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Get ThreeDs payment
  const handlePaymentThreeDs = async (e) => {
    const paymentInformations = {
      price: cart.cartTotalAmount,
      basketId: user ? user._id : "1231231",
      products: cart.products,
      paymentCard: {
        cardHolderName: inputs.cardName,
        cardNumber: inputs.cardNumber,
        expireMonth: inputs.expirationMonth,
        expireYear: inputs.expirationYear,
        cvc: inputs.cvc,
      },
      buyer: {
        id: user ? user._id : "1231231",
        name: inputs.firstName,
        surname: inputs.lastName,
        gsmNumber: inputs.phone,
        email: inputs.email,
        identityNumber: "0000000000000000000",
        lastLoginDate: "2020-10-05 12:43:45",
        registrationDate: "2020-10-04 12:43:45",
        registrationAddress: inputs.address,
        ip: "85.34.78.112" /* Kullanıcının IP adresi */,
        city: inputs.city /* Kullanıcının şehri */,
        country: inputs.country /* Kullanıcının ülkesi */,
        zipCode: inputs.zipCode,
      },
      shippingAddress: {
        contactName:
          inputs.firstName +
          " " +
          inputs.lastName /* Teslimat için Kullanıcının Adı */,
        city: inputs.city /* Teslimat için Kullanıcının Şehri */,
        country: inputs.country /* Teslimat için Kullanıcının Ülkesi */,
        address: inputs.address /* Teslimat için Kullanıcının Şehri */,
        zipCode: inputs.zipCode /* Teslimat için Kullanıcının Posta Kodu */,
      },
    };

    try {
      paymentThreeDs(paymentInformations).then(function (result) {
        console.log(result);
        if (result) {
          var x = window.open();
          x.document.open().write(result);
          handleCreateOrder();
          dispatch(clearAllCart());
          history.push("/");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Show for another billing inputs
  const handleClickShow = () => {
    if (current == false) {
      setCurrent(true);
    } else {
      setCurrent(false);
    }
  };
  //Checking  user check privacy
  const handleCheckPrivacy = () => {
    if (checkPrivacy == false) {
      setCheckPrivacy(true);
    } else {
      setCheckPrivacy(false);
    }
  };
  const handleOpenModal = () => {
    if (modalIsOpen) {
      setModalIsOpen(false);
    } else {
      setModalIsOpen(true);
    }
  };
  useEffect(() => {}, []);

  return (
    <MainLayout>
      <Conteiner>
        <Modal open={modalIsOpen}>
          <UpperModal>
            <ModalHeader></ModalHeader>
            <ModalHeader>Payment Informations</ModalHeader>
            <CloseSharp
              style={{ cursor: "pointer" }}
              onClick={handleOpenModal}
              size={25}
              color="black"
            />
          </UpperModal>
          <ModalFormContainer>
            <ModalRowContainer>
              <ModalInputContainer>
                <ModalInputHeader>Card Name</ModalInputHeader>
                <ModalInput
                  name="cardName"
                  value={inputs.cardName}
                  onChange={setInputs}
                ></ModalInput>
              </ModalInputContainer>
              <ModalInputContainer>
                <ModalInputHeader>Card Number</ModalInputHeader>
                <ModalInput
                  name="cardNumber"
                  value={inputs.cardNumber}
                  onChange={setInputs}
                ></ModalInput>
              </ModalInputContainer>
            </ModalRowContainer>
            <ModalRowContainer>
              <ModalInputContainerExp>
                <ModalInputHeader>Month</ModalInputHeader>
                <ModalInputExp
                  name="expirationMonth"
                  value={inputs.expirationMonth}
                  onChange={setInputs}
                ></ModalInputExp>
              </ModalInputContainerExp>
              <ModalInputContainerExp>
                <ModalInputHeader>Year</ModalInputHeader>
                <ModalInputExp
                  name="expirationYear"
                  value={inputs.expirationYear}
                  onChange={setInputs}
                ></ModalInputExp>
              </ModalInputContainerExp>
              <ModalInputContainerExp>
                <ModalInputHeader>CVC ?</ModalInputHeader>
                <ModalInputExp
                  name="cvc"
                  value={inputs.cvc}
                  onChange={setInputs}
                ></ModalInputExp>
              </ModalInputContainerExp>
            </ModalRowContainer>
            <ModalRowContainer>
              <p style={{ margin: "0.5rem" }}>
                Ön Bilgilendirme Formu'nu ve Mesafeli Satış Sözleşmesi 'ni
                onaylıyorum.
              </p>
            </ModalRowContainer>
            <ModalRowContainer>
              <ModalInputContainer>
                <PayButton onClick={handlePayment}>
                  <p style={{ margin: "0.2rem" }}>Pay </p>
                  <p style={{ margin: "0.2rem" }}>{cart.cartTotalAmount}$</p>
                </PayButton>
              </ModalInputContainer>
              <ModalInputContainer>
                <PayButton onClick={handlePaymentThreeDs}>
                  <p style={{ margin: "0.2rem" }}>Pay with 3D </p>
                  <p style={{ margin: "0.2rem" }}>{cart.cartTotalAmount}$</p>
                </PayButton>
              </ModalInputContainer>
            </ModalRowContainer>
            <ModalRowContainer>
              <ModalInputContainer>
                <ModalImage src={Sslimage}></ModalImage>
              </ModalInputContainer>
              <ModalInputContainer>
                {" "}
                <ModalImage src={Iyzicoimage}></ModalImage>
              </ModalInputContainer>
              <ModalInputContainer>
                {" "}
                <ModalImage src={Odemeimage}></ModalImage>
              </ModalInputContainer>
            </ModalRowContainer>
          </ModalFormContainer>
        </Modal>
        <GeneralFormConteiner bg={modalIsOpen}>
          <Header>Checkout</Header>
          <Divider></Divider>
          <FormConteiner>
            <LeftConteiner>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <InputConteiner>
                  <InputHeader>FirstName</InputHeader>
                  <Input
                    name="firstName"
                    value={inputs.firstName}
                    onChange={setInputs}
                  ></Input>
                  {inputs.firstNameError && (
                    <Error>Please enter your firstname</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px" }}>
                  <InputHeader>LastName</InputHeader>
                  <Input
                    name="lastName"
                    value={inputs.lastName}
                    onChange={setInputs}
                  ></Input>
                  {inputs.lastNameError && (
                    <Error>Please enter your lastname</Error>
                  )}
                </InputConteiner>
              </div>
              <HeaderOrderDetail>Shipping Address</HeaderOrderDetail>
              <InputConteiner>
                <InputHeader>Address</InputHeader>
                <InputAddress
                  name="address"
                  value={inputs.address}
                  onChange={setInputs}
                ></InputAddress>
                {inputs.addressError && (
                  <Error>Please enter your address</Error>
                )}
              </InputConteiner>
              <CountryCityZipConteiner>
                <InputConteiner>
                  <InputHeader>Country</InputHeader>

                  <InputAddress
                    name="country"
                    value={inputs.country}
                    onChange={setInputs}
                  ></InputAddress>
                  {inputs.countryError && (
                    <Error>Please enter your country name</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{}}>
                  <InputHeader>City</InputHeader>
                  <InputAddress
                    name="city"
                    value={inputs.city}
                    onChange={setInputs}
                  ></InputAddress>
                  {inputs.cityError && (
                    <Error>Please enter your city name</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{}}>
                  <InputHeader>ZipCode</InputHeader>
                  <InputAddress
                    name="zipCode"
                    value={inputs.zipCode}
                    onChange={setInputs}
                  ></InputAddress>
                  {inputs.zipCodeError && (
                    <Error>Please enter your zipcode</Error>
                  )}
                </InputConteiner>
              </CountryCityZipConteiner>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "12px",
                  marginTop: "12px",
                  alignItems: "center",
                }}
              >
                <label>Another Address For Billing</label>
                <input
                  type="checkbox"
                  style={{ marginLeft: "6px", height: "20px" }}
                  onClick={handleClickShow}
                ></input>
              </div>

              <div
                style={{
                  display: current ? "block" : "none",
                  flexDirection: "column",
                }}
              >
                <HeaderOrderDetail>Billing Address</HeaderOrderDetail>
                <InputConteiner>
                  <InputHeader>Address</InputHeader>
                  <InputAddress
                    name="address"
                    value={inputs.address}
                    onChange={setInputs}
                  ></InputAddress>
                </InputConteiner>
                <div style={{}}>
                  <InputConteiner>
                    <InputHeader>Country</InputHeader>
                    <InputAddress
                      name="country"
                      value={inputs.country}
                      onChange={setInputs}
                    ></InputAddress>
                  </InputConteiner>
                  <InputConteiner style={{}}>
                    <InputHeader>City</InputHeader>
                    <InputAddress
                      name="city"
                      value={inputs.city}
                      onChange={setInputs}
                    ></InputAddress>
                  </InputConteiner>
                  <InputConteiner style={{}}>
                    <InputHeader>ZipCode</InputHeader>
                    <InputAddress
                      name="zipCode"
                      value={inputs.zipCode}
                      onChange={setInputs}
                    ></InputAddress>
                  </InputConteiner>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <InputConteiner>
                  <InputHeader>Phone</InputHeader>
                  <Input
                    name="phone"
                    value={inputs.phone}
                    onChange={setInputs}
                  ></Input>
                  {inputs.phoneError && (
                    <Error>Please enter your phone number</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px" }}>
                  <InputHeader>E-mail</InputHeader>
                  <Input
                    name="email"
                    value={inputs.email}
                    onChange={setInputs}
                  ></Input>
                  {inputs.emailError && <Error>Please enter your E-mail</Error>}
                </InputConteiner>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <InputConteiner style={{}}>
                  <PayButton
                    onClick={() => {
                      setPageStart(true);

                      if (error === false) {
                        setModalIsOpen(true);
                      } else {
                      }
                    }}
                  >
                    Go Pay now
                  </PayButton>
                </InputConteiner>
              </div>
            </LeftConteiner>
            <RightConteiner>
              <HeaderOrderDetail>Summary</HeaderOrderDetail>
              <SummaryConteiner>
                <CartConteiner>
                  {cart.products.map((item, key) => (
                    <ItemConteiner key={item._id}>
                      <ItemText style={{ margin: "6px" }}>
                        {item.title}
                      </ItemText>
                      <ItemText style={{ margin: "6px" }}>
                        $ {item.price}
                      </ItemText>
                      <ItemText style={{ margin: "6px" }}>
                        x{item.cartQuantity}
                      </ItemText>
                    </ItemConteiner>
                  ))}
                </CartConteiner>
                <BottomConteinerSummary>
                  <TotalPriceText>
                    Total is : ${cart.cartTotalAmount}
                  </TotalPriceText>
                </BottomConteinerSummary>
              </SummaryConteiner>
            </RightConteiner>
          </FormConteiner>
        </GeneralFormConteiner>
      </Conteiner>
    </MainLayout>
  );
};

export default Checkout;
