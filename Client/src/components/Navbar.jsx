import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

import { publicRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { logout } from "../redux/userRedux";

const OutConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ position: "relative" })}
`;

const Container = styled.div`
  height: 60px;
  width: 100vw;

  ${mobile({ height: "auto" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;

  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px", flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ width: "80vw", marginLeft: "0px" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  margin-right: auto;
  flex: 1;
  margin-left: 6px;
  ${mobile({ width: "50px", marginLeft: "2px" })};
`;
const SearchText = styled.p`
  color: black;
  font-size: 16px;
  border-right: 1px solid gray;
  padding-right: 4px;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 28px;
  color: black;
  ${mobile({ fontSize: "10px", marginLeft: "6px" })};
`;
const MenuItemUsername = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 2px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const SearchTermConteiner = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  background-color: white;
  width: 35vw;
  height: auto;
  z-index: 3;
  position: absolute;
`;
const SearchInnerTermConteiner = styled.div`
  width: 35vw;
  height: 70px;
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  &:hover {
    box-shadow: 4px 4px 4px 4px lightgray;
    transition: 1s;
  }
`;
const SearchLeftConteiner = styled.div`
  flex: 2;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
const SearchCenterConteiner = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;
const SearchRightConteiner = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <OutConteiner>
      <Container>
        <Wrapper>
          <Left>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Logo>BBA SHOP LOGO</Logo>
            </Link>
          </Left>
          <Center>
            <SearchContainer>
              <SearchText>Search</SearchText>
              <Input
                placeholder="Search product , category or something..."
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Search
                style={{
                  color: "gray",

                  display: "inline-block",
                }}
              />
            </SearchContainer>
            <SearchTermConteiner>
              {products
                ?.filter((item) => {
                  if (searchTerm === "") {
                    return;
                  } else if (
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item) => {
                  return (
                    <Link to={`/product/${item._id}`}>
                      <SearchInnerTermConteiner>
                        <SearchLeftConteiner>
                          <Image src={item.image} />
                        </SearchLeftConteiner>
                        <SearchCenterConteiner>
                          <p style={{ textDecoration: "none", color: "black" }}>
                            {item.title}
                          </p>
                        </SearchCenterConteiner>
                        <SearchRightConteiner>
                          <p style={{ textDecoration: "none", color: "black" }}>
                            {item.price}$
                          </p>
                        </SearchRightConteiner>
                      </SearchInnerTermConteiner>
                    </Link>
                  );
                })}
            </SearchTermConteiner>
          </Center>
          <Right>
            {user ? null : (
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
            )}
            {user ? null : (
              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            )}

            {user && (
              <MenuItem>
                <MdAccountCircle size={35} color="gray" />
              </MenuItem>
            )}

            {user && <MenuItemUsername>{user.name}</MenuItemUsername>}

            {user && (
              <Link to="/userorders">
                <MenuItem>My Orders</MenuItem>
              </Link>
            )}
            {user && <MenuItem>My Supports</MenuItem>}
            {user && <MenuItem onClick={handleLogout}>Logout</MenuItem>}

            <Link to="/cart">
              <MenuItem>
                <Badge overlap="rectangular" badgeContent={quantity}>
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
          </Right>
        </Wrapper>
      </Container>
    </OutConteiner>
  );
};

export default Navbar;
