import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
const Conteiner = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Header = styled.h1`
  font-size: 1.5rem;
  color: #28a745;
  ${mobile({ fontSize: "12px" })}
`;
const SuccessIcon = styled.div`
  margin-top: 48px;
  ${mobile({ marginTop: "16px" })}
`;
const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 80vh;
  margin-top: 12vh;
  box-shadow: 10px 10px 10px 10px #888888;
  background-color: #fbfafa;
  ${mobile({ width: "80vw", height: "50vh" })}
`;
const ButtonsConteiner = styled.div`
  flex: display;
  flex-direction: row;

  margin-top: 88px;
  ${mobile({ marginTop: "22px", justifyContent: "space-around" })}
`;
const OrderShowButton = styled.button`
  width: 152px;
  height: 56px;
  margin-right: 84px;
  border-radius: 10px;
  border: 2px solid #28a745;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #28a745;
    transition: 0.5s ease-in;
  }
  ${mobile({ width: "80px", height: "52px", fontSize: "10px" })}
`;
const GoHomePageButton = styled.button`
  width: 152px;
  height: 56px;
  border-radius: 10px;
  border: 2px solid #28a745;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: transparent;
    color: #28a745;
    transition: 0.2s ease-in;
  }
  ${mobile({ width: "80px", height: "52px", fontSize: "10px" })}
`;
const Success = () => {
  const location = useLocation();
  console.log(location);
  return (
    <Conteiner>
      <InnerContainer>
        <Header>YOUR PAYMENT HAS DONE SUCCESSFULLY</Header>
        <SuccessIcon>
          <DoneIcon style={{ color: "#28a745", fontSize: "64" }} />
        </SuccessIcon>
        <ButtonsConteiner>
          <Link to="/userorders">
            <OrderShowButton>Show My Orders</OrderShowButton>
          </Link>
          <Link to={"/"}>
            <GoHomePageButton>Go Home Page</GoHomePageButton>
          </Link>
        </ButtonsConteiner>
      </InnerContainer>
    </Conteiner>
  );
};
export default Success;
