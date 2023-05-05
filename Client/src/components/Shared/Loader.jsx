import React from "react";
import styled from "styled-components";
const Container = styled.div`
  border: 6px solid gray;
  border-top: 6px teal solid;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;
const Loader = () => {
  return <Container></Container>;
};

export default React.memo(Loader);
