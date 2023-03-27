import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { login, loginGuest } from "../api/userAPI";
import { mobile } from "../responsive";
import { useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PasswordIcon from "@mui/icons-material/Password";
import { useInputs } from "../hooks/useInputs";
import MainLayout from "../layouts/MainLayout";
const Conteiner = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  ${mobile({ height: "auto", alignItems: "center" })}
`;
const Header = styled.h1`
  padding: 6px;
  margin-bottom: 12px;
  ${mobile({ marginBottom: "2px", fontSize: "24px" })}
`;
const FormConteiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 24px;
  height: 70%;
  ${mobile({ flexDirection: "column", width: "88vw" })}
`;
const InnerFormConteiner = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 32px;
  width: 100%;
  ${mobile({ marginTop: "6px" })}
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
    marginTop: "12px",
  })}
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 22px;
  border: 0.5px solid lightgray;
  padding: 8px;
  ${mobile({ fontSize: "18px" })}
`;
const Button = styled.button`
  width: 100%;
  height: 60px;
  background-color: teal;
  color: white;
  font-size: 32px;
  font-weight: 600;
  border: 0.5px solid lightgray;
  cursor: pointer;
  ${mobile({ marginTop: "6px", fontSize: "24px" })}
`;
const Error = styled.p`
  color: red;
  font-size: 16px;
`;
const OrderUserLogin = () => {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useInputs({
    email: "",
    emailError: false,
    password: "",
    passwordError: false,
    phone: "",
    phoneError: false,
  });

  const [error, setError] = useState(false);
  const [pageStart, setPageStart] = useState(false);

  const validate = () => {
    if (!inputs.email) {
      setError(true);
      inputs.emailError = true;
    } else {
      setError(false);
      inputs.emailError = false;
    }
    if (!inputs.password) {
      setError(true);
      inputs.passwordError = true;
    } else {
      setError(false);
      inputs.passwordError = false;
    }
    if (!inputs.phone) {
      setError(true);
      inputs.phoneError = true;
    } else {
      setError(false);
      inputs.phonedError = false;
    }
  };

  const handleLoginAsGuest = async () => {
    setPageStart(true);
    const email = inputs.email;
    const phone = inputs.phone;
    try {
      if (email && phone) await loginGuest(dispatch, { email });
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogin = async () => {
    const email = inputs.email;
    const password = inputs.password;
    try {
      await login(dispatch, { email, password });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    pageStart && validate();
  });

  return (
    <MainLayout>
      <Conteiner>
        <FormConteiner>
          <LoginConteiner>
            <Header>User Sign In</Header>
            <InnerFormConteiner>
              <div style={{ backgroundColor: "gray" }}>
                <MailOutlineIcon
                  style={{ fontSize: "40px", color: "white", padding: "8px" }}
                />
              </div>
              <Input
                placeholder="E-mail"
                name="email"
                value={inputs.email}
                onChange={setInputs}
              ></Input>
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
                name="password"
                value={inputs.password}
                onChange={setInputs}
              ></Input>
            </InnerFormConteiner>
            <InnerFormConteiner>
              <Button
                onClick={() => {
                  handleLogin();
                }}
              >
                Sign In
              </Button>
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
                type="email"
                name="email"
                value={inputs.email}
                onChange={setInputs}
              ></Input>
            </InnerFormConteiner>
            {inputs.emailError && (
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
                type="phone"
                name="phone"
                value={inputs.phone}
                onChange={setInputs}
              ></Input>
            </InnerFormConteiner>
            {inputs.phoneError && (
              <Error style={{ textAlign: "center" }}>
                Phone number is required
              </Error>
            )}

            <InnerFormConteiner>
              <Button onClick={() => handleLoginAsGuest()}>Go Shopping</Button>
            </InnerFormConteiner>
          </LoginConteiner>
        </FormConteiner>
      </Conteiner>
    </MainLayout>
  );
};

export default OrderUserLogin;
