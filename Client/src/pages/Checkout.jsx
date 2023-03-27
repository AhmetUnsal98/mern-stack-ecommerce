import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Odemeimage from "../assets/odeme.png";
import Iyzicoimage from "../assets/iyzico.png";
import Sslimage from "../assets/ssl.png";
import { clearAllCart } from "../redux/cartRedux";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import { useInputs } from "../hooks/useInputs";
import MainLayout from "../layouts/MainLayout";
import { paymentNormal, paymentThreeDs } from "../api/paymentAPI";
import { createOrder } from "../api/orderAPI";
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
  width: 100vw;
  height: auto;
  margin-top: 14px;
  margin-left: 24px;
  ${mobile({ marginTop: "6px", marginLeft: "6px" })}
`;
const FormConteiner = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: row;
  ${mobile({ flexDirection: "column" })}
`;
const LeftConteiner = styled.div`
  width: 50%;
  height: auto;
  margin-top: 12px;
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
  border: 2px solid lightgray;
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
  border-bottom: 1px solid lightgray;
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
  ${mobile({ marginTop: "12px" })}
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
  ${mobile({ height: "35px", width: "auto" })}
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

const ModalConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 34px;
`;
const UpperModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ImageConteiner = styled.div`
  width: 100%;
  height: 100px;
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
  const [products, setProducts] = useState([]);
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
    setProducts(cart.products);
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
    setProducts(cart.products);
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

  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <MainLayout>
      <Conteiner>
        <GeneralFormConteiner>
          <Modal
            isOpen={modalIsOpen}
            parentSelector={() => document.querySelector("#root")}
          >
            <UpperModal>
              <p></p>
              <h1>Payment Informations</h1>
              <button
                onClick={() => {
                  setModalIsOpen(false);
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "0px solid lightgray",
                  fontSize: "24px",
                }}
              >
                X
              </button>
            </UpperModal>
            <ModalConteiner>
              <div
                style={{ display: "flex", flexDirection: "row", width: "40%" }}
              >
                <InputConteiner>
                  <InputHeader>Card Name</InputHeader>
                  <Input
                    name="cardName"
                    value={inputs.cardName}
                    onChange={setInputs}
                  ></Input>
                  {inputs.cardNameError && (
                    <Error>Please enter your firstname</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px" }}>
                  <InputHeader>Card Number</InputHeader>
                  <Input
                    id="ccn"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autocomplete="cc-number"
                    maxlength="19"
                    placeholder="xxxx xxxx xxxx xxxx"
                    name="cardNumber"
                    value={inputs.cardNumber}
                    onChange={setInputs}
                  ></Input>
                  {inputs.cardNumberError && (
                    <Error>Please enter your firstname</Error>
                  )}
                </InputConteiner>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", width: "40%" }}
              >
                <InputConteiner>
                  <InputHeader>Expiration Month</InputHeader>
                  <Input
                    name="expirationMonth"
                    value={inputs.expirationMonth}
                    onChange={setInputs}
                  ></Input>
                  {inputs.expirationMonthError && (
                    <Error>Please enter your expirationMonth</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px" }}>
                  <InputHeader>Expiration Year</InputHeader>
                  <Input
                    name="expirationYear"
                    value={inputs.expirationYear}
                    onChange={setInputs}
                  ></Input>
                  {inputs.expirationYearError && (
                    <Error>Please enter your expirationYear</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px" }}>
                  <InputHeader>CVC</InputHeader>
                  <Input
                    name="cvc"
                    value={inputs.cvc}
                    onChange={setInputs}
                  ></Input>
                  {inputs.cvcError && <Error>Please enter your cvc</Error>}
                </InputConteiner>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "12px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  defaultChecked={checkPrivacy}
                  style={{
                    marginRight: "24px",
                    height: "25px",
                    border: "1px solid black",
                  }}
                  onClick={() => setCheckPrivacy(!checkPrivacy)}
                ></input>
                <label style={{ fontSize: "16px", fontWeight: "700" }}>
                  Ön Bilgilendirme Formu'nu ve Mesafeli Satış Sözleşmesi 'ni
                  onaylıyorum.
                </label>
              </div>
              <div
                style={{ display: "flex", flexDirection: "row", width: "40%" }}
              >
                <InputConteiner style={{ flex: "1" }}>
                  <select
                    style={{
                      height: "60px",
                      textAlign: "center",
                      fontSize: "16px",
                    }}
                    onChange={(e) => setInstallment(e.target.value)}
                  >
                    <option value=" disabled">Taksit Seç</option>
                    <option>2</option>
                    <option>3</option>
                    <option>6</option>
                    <option>9</option>
                    <option>12</option>
                  </select>
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px", flex: "2" }}>
                  <PayButton
                    onClick={() => {
                      handlePayment();
                    }}
                  >
                    Go Pay Normal
                  </PayButton>
                </InputConteiner>
                <InputConteiner style={{ marginLeft: "12px", flex: "2" }}>
                  <PayButton
                    onClick={() => {
                      handlePaymentThreeDs();
                    }}
                  >
                    Go Pay With 3D Secure
                  </PayButton>
                </InputConteiner>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "35%",
                  marginTop: "24px",
                }}
              >
                <ImageConteiner>
                  <img
                    src={Iyzicoimage}
                    style={{ width: "100%", height: "100%", objectFit: "fill" }}
                  ></img>
                </ImageConteiner>
                <ImageConteiner>
                  <img
                    src={Odemeimage}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      marginLeft: "12px",
                    }}
                  ></img>
                </ImageConteiner>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "25%",
                  marginTop: "12px",
                }}
              >
                <ImageConteiner>
                  <img
                    src={Sslimage}
                    style={{ width: "100%", height: "100%", objectFit: "fill" }}
                  ></img>
                </ImageConteiner>
              </div>
            </ModalConteiner>
          </Modal>

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
                <Input
                  name="address"
                  value={inputs.address}
                  onChange={setInputs}
                ></Input>
                {inputs.addressError && (
                  <Error>Please enter your address</Error>
                )}
              </InputConteiner>
              <CountryCityZipConteiner>
                <InputConteiner>
                  <InputHeader>Country</InputHeader>

                  <Input
                    name="country"
                    value={inputs.country}
                    onChange={setInputs}
                  ></Input>
                  {inputs.countryError && (
                    <Error>Please enter your country name</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{}}>
                  <InputHeader>City</InputHeader>
                  <Input
                    name="city"
                    value={inputs.city}
                    onChange={setInputs}
                  ></Input>
                  {inputs.cityError && (
                    <Error>Please enter your city name</Error>
                  )}
                </InputConteiner>
                <InputConteiner style={{}}>
                  <InputHeader>ZipCode</InputHeader>
                  <Input
                    name="zipCode"
                    value={inputs.zipCode}
                    onChange={setInputs}
                  ></Input>
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
                  <Input
                    name="address"
                    value={inputs.address}
                    onChange={setInputs}
                  ></Input>
                </InputConteiner>
                <div style={{}}>
                  <InputConteiner>
                    <InputHeader>Country</InputHeader>
                    <Input
                      name="country"
                      value={inputs.country}
                      onChange={setInputs}
                    ></Input>
                  </InputConteiner>
                  <InputConteiner style={{}}>
                    <InputHeader>City</InputHeader>
                    <Input
                      name="city"
                      value={inputs.city}
                      onChange={setInputs}
                    ></Input>
                  </InputConteiner>
                  <InputConteiner style={{}}>
                    <InputHeader>ZipCode</InputHeader>
                    <Input
                      name="zipCode"
                      value={inputs.zipCode}
                      onChange={setInputs}
                    ></Input>
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
