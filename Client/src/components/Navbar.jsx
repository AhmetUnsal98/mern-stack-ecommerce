import { Badge } from "@material-ui/core";
import {
  ArrowRightSharp,
  CloseSharp,
  PersonOutline,
  Search,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import { MenuOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { logout } from "../redux/userRedux";

const GeneralConteiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${mobile({ position: "relative" })}
`;

const Container = styled.div`
  height: 10vh;
  width: 100vw;
  margin-top: 1rem;
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
  ${mobile({ marginBottom: "0.5rem" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ width: "80vw", marginLeft: "0px", width: "80vw" })}
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
  ${mobile({
    display: "none",
  })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  margin-left: 28px;
  color: black;
  ${mobile({
    fontSize: "10px",
    marginLeft: "6px",
    fontSize: "16px",
    margin: "1rem",
  })};
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
  ${mobile({ width: "82vw", Zindex: "999", backgroundColor: "lightgray" })}
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
const MenuMobile = styled.div`
  display: none;
  ${mobile({
    width: "100vw",
    height: "5vh",
    marginTop: "0.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  })}
`;
const MenuDrawer = styled.div`
  width: 65vw;
  z-index: 999;
  background-color: white;
  opacity: 0.98;
  height: 200vh;
  left: 0;
  top: 0;
  position: absolute;
  display: flex;
  justify-content: center;
`;
const DrawerInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  position: relative;
`;
const DrawerItem = styled.div`
  width: 85%;
  height: 3vh;
  margin: 0.5rem;
  border-bottom: 1px solid lightgray;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const DrawerItemText = styled.p`
  color: gray;
  font-size: 1.2rem;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.cartTotalQuantity);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState();

  const [drawerMenu, setDrawerMenu] = useState("menu");
  const [openMenu, setOpenMenu] = useState(false);

  const handleDrawerType = (drawerType) => {
    setDrawerMenu(drawerType);
    if (openMenu) {
      setOpenMenu(false);
      document.body.style.overflow = "";
    } else {
      setOpenMenu(true);
      document.body.style.overflow = "hidden";
    }
  };

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
    <GeneralConteiner>
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
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
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
                <MenuItem>SIGN UP</MenuItem>
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
          <MenuMobile>
            <MenuOutlined
              onClick={() => {
                handleDrawerType("menu");
              }}
              size={30}
              color="black"
            />
            <Link to="/cart">
              <MenuItem>
                <Badge overlap="rectangular" badgeContent={quantity}>
                  <ShoppingCartOutlined />
                </Badge>
              </MenuItem>
            </Link>
            <PersonOutline
              onClick={() => {
                handleDrawerType("profile");
              }}
              size={30}
              color="black"
            />
          </MenuMobile>
        </Wrapper>
      </Container>
      <MenuDrawer
        style={openMenu === true ? { display: "flex" } : { display: "none" }}
      >
        {drawerMenu === "profile" ? (
          <DrawerInnerContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "0.5rem",
              }}
            >
              <Logo>Profile</Logo>
              <CloseSharp
                onClick={() => {
                  handleDrawerType("none");
                }}
                size={30}
                color="white"
              />
            </div>
            {user ? null : (
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "black" }}
              >
                <DrawerItem>
                  <DrawerItemText>Sign In</DrawerItemText>
                  <ArrowRightSharp color="lightgray" size={20} />
                </DrawerItem>
              </Link>
            )}
            {user ? null : (
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "black" }}
              >
                <DrawerItem>
                  <DrawerItemText>Sign Up</DrawerItemText>
                  <ArrowRightSharp color="lightgray" size={20} />
                </DrawerItem>
              </Link>
            )}
            {user && (
              <DrawerItem>
                <DrawerItemText>My Profile</DrawerItemText>
                <ArrowRightSharp color="lightgray" size={20} />
              </DrawerItem>
            )}
            {user && (
              <Link
                to="/userorders"
                style={{ textDecoration: "none", color: "black" }}
              >
                <DrawerItem>
                  <DrawerItemText>My Orders</DrawerItemText>
                  <ArrowRightSharp color="lightgray" size={20} />
                </DrawerItem>
              </Link>
            )}
            {user && (
              <DrawerItem>
                <DrawerItemText>Supports</DrawerItemText>
                <ArrowRightSharp color="lightgray" size={20} />
              </DrawerItem>
            )}
            {user && (
              <DrawerItem onClick={handleLogout}>
                <DrawerItemText>Logout</DrawerItemText>
                <MdLogout color="black" size={20} />
              </DrawerItem>
            )}
          </DrawerInnerContainer>
        ) : (
          <DrawerInnerContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "0.5rem",
              }}
            >
              <Logo>Menu</Logo>
              <CloseSharp
                onClick={() => {
                  handleDrawerType("none");
                }}
                size={30}
                color="white"
              />
            </div>

            <DrawerItem>
              <DrawerItemText>Home</DrawerItemText>
              <ArrowRightSharp color="lightgray" size={20} />
            </DrawerItem>
            <DrawerItem>
              <DrawerItemText>Products</DrawerItemText>
              <ArrowRightSharp color="lightgray" size={20} />
            </DrawerItem>
            <Logo
              style={{
                margin: "0.5rem",
              }}
            >
              Categories
            </Logo>
            <DrawerItem>
              <DrawerItemText>All</DrawerItemText>
              <ArrowRightSharp color="lightgray" size={20} />
            </DrawerItem>
            <DrawerItem>
              <DrawerItemText>T-shirt</DrawerItemText>
              <ArrowRightSharp color="lightgray" size={20} />
            </DrawerItem>
            <DrawerItem>
              <DrawerItemText>Loungewear</DrawerItemText>
              <ArrowRightSharp color="lightgray" size={20} />
            </DrawerItem>
            <DrawerItem>
              <DrawerItemText>Light Jackets</DrawerItemText>
              <ArrowRightSharp color="lightgray" size={20} />
            </DrawerItem>
          </DrawerInnerContainer>
        )}
      </MenuDrawer>
    </GeneralConteiner>
  );
};

export default React.memo(Navbar);
