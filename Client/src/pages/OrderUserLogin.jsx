import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login, loginGuest } from "../redux/apiCalls";

import { mobile } from "../responsive";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";

import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Conteiner = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${mobile({ height: "auto" })}
`;
const Header = styled.h1`
  padding: 6px;
  margin-bottom: 12px;
`;
const FormConteiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
  height: 70%;
  ${mobile({ flexDirection: "column", width: "100vw" })}
`;
const InnerFormConteiner = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  width: 100%;
`;
const LoginConteiner = styled.div`
  width: 40%;
  height: auto;
  box-shadow: 2px 2px 4px 4px lightgray;
  padding: 16px;
  ${mobile({
    width: "100%",
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  })}
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 22px;
  border: 0.5px solid lightgray;
  padding: 8px;
`;
const Button = styled.button`
  width: 100%;
  height: 60px;
  background-color: teal;
  color: white;
  font-size: 32px;
  font-weight: 600;
  border: 0.5px solid lightgray;
`;
const Error = styled.p`
  color: red;
  font-size: 16px;
`;
const OrderUserLogin = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [nameError, setErrorName] = useState(false);
  const [surname, setSurname] = useState("");
  const [surnameError, setErrorSurName] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setErrorEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setErrorPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setErrorPhone] = useState(false);
  const [error, setError] = useState(false);
  const [pageStart, setPageStart] = useState(false);
  const validate = () => {
    if (!name) {
      setError(true);
      setErrorName(true);
    } else {
      setError(false);
      setErrorName(false);
    }
    if (!surname) {
      setError(true);
      setErrorSurName(true);
    } else {
      setError(false);
      setErrorSurName(false);
    }
    if (!email) {
      setError(true);
      setErrorEmail(true);
    } else {
      setError(false);
      setErrorEmail(false);
    }
    if (!phone) {
      setError(true);
      setErrorPhone(true);
    } else {
      setError(false);
      setErrorPhone(false);
    }
  };

  const handleGoShopping = () => {
    console.log("click");
    setPageStart(true);
    email && loginGuest(dispatch, { email });
  };
  const handleLogin = () => {
    login(dispatch, { email, password });
  };
  useEffect(() => {
    pageStart && validate();
  });

  return (
    <Conteiner>
      <Announcement />
      <Navbar />
      <FormConteiner>
        <LoginConteiner>
          <Header>User Sign In</Header>
          <InnerFormConteiner>
            <div style={{ backgroundColor: "gray" }}>
              <MailOutlineIcon
                style={{ fontSize: "40px", color: "white", padding: "8px" }}
              />
            </div>
            <Input placeholder="E-mail"></Input>
          </InnerFormConteiner>

          <InnerFormConteiner>
            <div style={{ backgroundColor: "gray" }}>
              <PasswordIcon
                style={{ fontSize: "40px", color: "white", padding: "8px" }}
              />
            </div>
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
          </InnerFormConteiner>
          <InnerFormConteiner>
            <Button onClick={handleLogin}>Sign In</Button>
          </InnerFormConteiner>
        </LoginConteiner>
        <LoginConteiner>
          <Header>Continue Without Sign in</Header>

          <InnerFormConteiner>
            <div style={{ backgroundColor: "gray" }}>
              <MailOutlineIcon
                style={{ fontSize: "40px", color: "white", padding: "8px" }}
              />
            </div>
            <Input
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            ></Input>
          </InnerFormConteiner>
          {emailError && (
            <Error style={{ textAlign: "center" }}>E-mail is required</Error>
          )}

          <InnerFormConteiner>
            <div style={{ backgroundColor: "gray" }}>
              <LocalPhoneIcon
                style={{ fontSize: "40px", color: "white", padding: "8px" }}
              />
            </div>
            <Input
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            ></Input>
          </InnerFormConteiner>
          {phoneError && (
            <Error style={{ textAlign: "center" }}>
              Phone number is required
            </Error>
          )}

          <InnerFormConteiner>
            <Button onClick={() => handleGoShopping()}>Go Shopping</Button>
          </InnerFormConteiner>
        </LoginConteiner>
      </FormConteiner>
      <Footer />
    </Conteiner>
  );
};

export default OrderUserLogin;
