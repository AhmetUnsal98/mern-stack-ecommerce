import React from "react";
import Announcement from "../components/Shared/Announcement";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;

const MainLayout = ({ children }) => {
  return (
    <Container>
      <Announcement />
      <Navbar />
      {children}
      <Footer />
    </Container>
  );
};

export default MainLayout;
