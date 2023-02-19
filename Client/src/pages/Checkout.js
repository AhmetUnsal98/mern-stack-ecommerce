import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import { useSelector, useDispatch } from "react-redux";
import { userRequest, publicRequest } from "../requestMethods";
import Odemeimage from "../img/odeme.png";
import Iyzicoimage from "../img/iyzico.png";
import Sslimage from "../img/ssl.png";
import { clearAllCart } from "../redux/cartRedux";
import Modal from "react-modal";

import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { nanoid } from "@reduxjs/toolkit";
const Conteiner = styled.div`
  width: 100vw;
  height: 100vh;
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
  height: 100vh;

  display: flex;
  flex-direction: row;
  ${mobile({ flexDirection: "column" })}
`;
const LeftConteiner = styled.div`
  width: 50%;
  height: 100vh;
  margin-top: 12px;
`;
const RightConteiner = styled.div`
  width: 45%;
  height: 100vh;
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
const ModalWalletConteiner = styled.div`
  background-color: red;
  width: 400px;
  height: 100px;
`;
const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();
  const history = useHistory();

  //Order Details
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState(false);
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  //Payment Informations
  const [cardName, setCardName] = useState("");
  const [cardNameError, setCardNameError] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState(false);
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationMonthError, setExpirationMonthError] = useState(false);
  const [expirationYear, setExpirationYear] = useState("");
  const [expirationYearError, setExpirationYearError] = useState(false);

  const [cvc, setCvc] = useState("");
  const [cvcError, setCvcError] = useState(false);

  const [installment, setInstallment] = useState("");

  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [pageStart, setPageStart] = useState(false);
  const [error, setError] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //Validate inputs function
  const validationInputs = () => {
    if (!firstName) {
      setFirstNameError(true);
      setError(true);
    } else {
      setFirstNameError(false);
      setError(false);
    }

    if (!lastName) {
      setLastNameError(true);
      setError(true);
    } else {
      setLastNameError(false);
      setError(false);
    }

    if (!address) {
      setAddressError(true);
      setError(true);
    } else {
      setAddressError(false);
      setError(false);
    }

    if (!country) {
      setCountryError(true);
      setError(true);
    } else {
      setCountryError(false);
      setError(false);
    }

    if (!city) {
      setCityError(true);
      setError(true);
    } else {
      setCityError(false);
      setError(false);
    }

    if (!zipCode) {
      setZipCodeError(true);
      setError(true);
    } else {
      setZipCodeError(false);
      setError(false);
    }

    if (!phone) {
      setPhoneError(true);
      setError(true);
    } else {
      setPhoneError(false);
      setError(false);
    }

    if (!email) {
      setEmailError(true);
      setError(true);
    } else {
      setEmailError(false);
      setError(false);
    }

    /*if (!cardName) {
      setCardNameError(true);
    } else {
      setCardNameError(false);
    }

    if (!cardNumber) {
      setCardNumberError(true);
    } else {
      setCardNumberError(false);
    }

    if (!expirationMonth) {
      setExpirationMonthError(true);
    } else {
      setExpirationMonthError(false);
    }

    if (!expirationYear) {
      setExpirationYearError(true);
    } else {
      setExpirationYearError(false);
    }

    if (!cvc) {
      setCvcError(true);
    } else {
      setCvcError(false);
    }*/
  };

  //Create a new Order

  const createOrder = async () => {
    try {
      const res = await userRequest.post("/createOrder", {
        userId: user._id,
        locale: "tr",
        products: cart.products,
        amount: cart.cartTotalAmount,
        address: address,
        status: "pending",
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Get normal payment
  const handlePayment = async (e) => {
    validationInputs();

    setProducts(cart.products);

    try {
      const res = await userRequest.post("/payment", {
        price: cart.cartTotalAmount,
        basketId: user ? user._id : "1231231",
        products: cart.products,
        paymentCard: {
          cardHolderName: cardName,
          cardNumber: cardNumber,
          expireMonth: expirationMonth,
          expireYear: expirationYear,
          cvc: cvc,
        },
        buyer: {
          id: user ? user._id : "1231231",
          name: firstName,
          surname: lastName,
          gsmNumber: phone,
          email: email,
          identityNumber: "0000000000000000000",
          lastLoginDate: "2020-10-05 12:43:45",
          registrationDate: "2020-10-04 12:43:45",
          registrationAddress: address,
          ip: "85.34.78.112" /* Kullanıcının IP adresi */,
          city: city /* Kullanıcının şehri */,
          country: country /* Kullanıcının ülkesi */,
          zipCode: zipCode,
        },
        shippingAddress: {
          contactName:
            firstName + " " + lastName /* Teslimat için Kullanıcının Adı */,
          city: city /* Teslimat için Kullanıcının Şehri */,
          country: country /* Teslimat için Kullanıcının Ülkesi */,
          address: address /* Teslimat için Kullanıcının Şehri */,
          zipCode: zipCode /* Teslimat için Kullanıcının Posta Kodu */,
        },
      });
      console.log(res.data);

      if (res.data.status === "success") {
        createOrder();
        dispatch(clearAllCart());

        history.push("/Success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong with your payment information. Please try again !",
        });
      }
    } catch (e) {}
  };

  //Get ThreeDs paymen
  const handlePaymentThreeDs = async (e) => {
    validationInputs();

    if (checkPrivacy === true) {
      setProducts(cart.products);
      try {
        const res = await userRequest.post("/payment/threeds", {
          price: cart.cartTotalAmount,
          basketId: user._id,
          products: cart.products,
          paymentCard: {
            cardHolderName: cardName,
            cardNumber: cardNumber,
            expireMonth: expirationMonth,
            expireYear: expirationYear,
            cvc: cvc,
          },
          buyer: {
            id: user._id,
            name: firstName,
            surname: lastName,
            gsmNumber: phone,
            email: email,
            identityNumber: "0000000000000000000",
            lastLoginDate: "2020-10-05 12:43:45",
            registrationDate: "2020-10-04 12:43:45",
            registrationAddress: address,
            ip: "85.34.78.112" /* Kullanıcının IP adresi */,
            city: city /* Kullanıcının şehri */,
            country: country /* Kullanıcının ülkesi */,
            zipCode: zipCode,
          },
          shippingAddress: {
            contactName:
              firstName + " " + lastName /* Teslimat için Kullanıcının Adı */,
            city: city /* Teslimat için Kullanıcının Şehri */,
            country: country /* Teslimat için Kullanıcının Ülkesi */,
            address: address /* Teslimat için Kullanıcının Şehri */,
            zipCode: zipCode /* Teslimat için Kullanıcının Posta Kodu */,
          },
        });
        console.log("res:" + res.data);
        if (res.data) {
          var x = window.open();
          x.document.open().write(res.data);
          createOrder();
          dispatch(clearAllCart());
          history.push("/");
        }
      } catch (e) {}
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please make sure that you already check privacy settings",
      });
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
    pageStart && validationInputs();
    Modal.setAppElement("body");
  }, []);

  return (
    <Conteiner>
      <Announcement />
      <Navbar />
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
                <Input onChange={(e) => setCardName(e.target.value)}></Input>
                {cardNameError && <Error>Please enter your firstname</Error>}
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
                  onChange={(e) => setCardNumber(e.target.value)}
                ></Input>
                {cardNumberError && <Error>Please enter your firstname</Error>}
              </InputConteiner>
            </div>
            <div
              style={{ display: "flex", flexDirection: "row", width: "40%" }}
            >
              <InputConteiner>
                <InputHeader>Expiration Month</InputHeader>
                <Input
                  onChange={(e) => setExpirationMonth(e.target.value)}
                ></Input>
                {expirationMonthError && (
                  <Error>Please enter your expirationMonth</Error>
                )}
              </InputConteiner>
              <InputConteiner style={{ marginLeft: "12px" }}>
                <InputHeader>Expiration Year</InputHeader>
                <Input
                  onChange={(e) => setExpirationYear(e.target.value)}
                ></Input>
                {expirationYearError && (
                  <Error>Please enter your expirationYear</Error>
                )}
              </InputConteiner>
              <InputConteiner style={{ marginLeft: "12px" }}>
                <InputHeader>CVC</InputHeader>
                <Input onChange={(e) => setCvc(e.target.value)}></Input>
                {cvcError && <Error>Please enter your cvc</Error>}
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
                <PayButton onClick={() => handlePayment()}>
                  Go Pay Normal
                </PayButton>
              </InputConteiner>
              <InputConteiner style={{ marginLeft: "12px", flex: "2" }}>
                <PayButton onClick={handlePaymentThreeDs}>
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
                <Input onChange={(e) => setFirstName(e.target.value)}></Input>
                {firstNameError && <Error>Please enter your firstname</Error>}
              </InputConteiner>
              <InputConteiner style={{ marginLeft: "12px" }}>
                <InputHeader>LastName</InputHeader>
                <Input onChange={(e) => setLastName(e.target.value)}></Input>
                {lastNameError && <Error>Please enter your lastname</Error>}
              </InputConteiner>
            </div>
            <HeaderOrderDetail>Shipping Address</HeaderOrderDetail>
            <InputConteiner>
              <InputHeader>Address</InputHeader>
              <Input onChange={(e) => setAddress(e.target.value)}></Input>
              {addressError && <Error>Please enter your address</Error>}
            </InputConteiner>
            <CountryCityZipConteiner>
              <InputConteiner>
                <InputHeader>Country</InputHeader>

                <Input onChange={(e) => setCountry(e.target.value)}></Input>
                {countryError && <Error>Please enter your country name</Error>}
              </InputConteiner>
              <InputConteiner style={{}}>
                <InputHeader>City</InputHeader>
                <Input onChange={(e) => setCity(e.target.value)}></Input>
                {cityError && <Error>Please enter your city name</Error>}
              </InputConteiner>
              <InputConteiner style={{}}>
                <InputHeader>ZipCode</InputHeader>
                <Input onChange={(e) => setZipCode(e.target.value)}></Input>
                {zipCodeError && <Error>Please enter your zipcode</Error>}
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
                <Input onChange={(e) => setAddress(e.target.value)}></Input>
              </InputConteiner>
              <div style={{}}>
                <InputConteiner>
                  <InputHeader>Country</InputHeader>
                  <Input onChange={(e) => setCountry(e.target.value)}></Input>
                </InputConteiner>
                <InputConteiner style={{}}>
                  <InputHeader>City</InputHeader>
                  <Input onChange={(e) => setCity(e.target.value)}></Input>
                </InputConteiner>
                <InputConteiner style={{}}>
                  <InputHeader>ZipCode</InputHeader>
                  <Input onChange={(e) => setZipCode(e.target.value)}></Input>
                </InputConteiner>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <InputConteiner>
                <InputHeader>Phone</InputHeader>
                <Input onChange={(e) => setPhone(e.target.value)}></Input>
                {phoneError && <Error>Please enter your phone number</Error>}
              </InputConteiner>
              <InputConteiner style={{ marginLeft: "12px" }}>
                <InputHeader>E-mail</InputHeader>
                <Input onChange={(e) => setEmail(e.target.value)}></Input>
                {emailError && <Error>Please enter your E-mail</Error>}
              </InputConteiner>
            </div>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <InputConteiner style={{}}>
                <PayButton
                  onClick={() => {
                    console.log("clikc");
                    setPageStart(true);
                    validationInputs();
                    if (error === false) {
                      setModalIsOpen(true);
                    } else {
                      validationInputs();
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
                    <ItemText style={{ margin: "6px" }}>{item.title}</ItemText>
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
  );
};

export default Checkout;
