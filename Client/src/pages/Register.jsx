import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [name, SetName] = useState("");
  const [lastname, SetLastName] = useState("");
  const [phone, SetPhoneNumber] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await publicRequest.post("/register", {
        name: name,
        surname: lastname,

        email: email,
        role: "user",
        password: password,
        locale: "tr",
      });
      console.log(res);
      login(dispatch, { email, password });
    } catch (error) {}
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name"
            onChange={(e) => {
              SetName(e.target.value);
            }}
          />
          <Input
            placeholder="last name"
            onChange={(e) => {
              SetLastName(e.target.value);
            }}
          />
          <Input
            placeholder="phone"
            onChange={(e) => {
              SetPhoneNumber(e.target.value);
            }}
          />
          <Input
            placeholder="email"
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={registerHandler}>SIGN UP</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
