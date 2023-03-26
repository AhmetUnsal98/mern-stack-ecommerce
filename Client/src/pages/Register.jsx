import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../api/userAPI";
import { useDispatch } from "react-redux";
import { useInputs } from "../hooks/useInputs";
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
  const [inputs, setInputs] = useInputs({
    name: "",
    surname: "",
    phone: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const registerHandler = async (e) => {
    e.preventDefault();
    const user = {
      name: inputs.name,
      surname: inputs.surname,
      phone: inputs.phone,
      email: inputs.email,
      password: inputs.password,
    };
    await register(dispatch, user);
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name"
            name="name"
            value={inputs.name}
            onChange={setInputs}
          />
          <Input
            placeholder="surname"
            name="surname"
            value={inputs.surname}
            onChange={setInputs}
          />
          <Input
            placeholder="phone"
            name="phone"
            value={inputs.phone}
            onChange={setInputs}
          />
          <Input
            placeholder="email"
            name="email"
            value={inputs.email}
            onChange={setInputs}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={inputs.password}
            onChange={setInputs}
          />
          <Input type="password" placeholder="confirm password" />
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
