import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import astronaut from "./astronaut.svg";

const MainImage = styled.img`
  width: 20rem;
`;

const MainTitle = styled.strong`
  font-size: 4rem;
  font-weight: 300;
  margin: 0.5em 0 0;
`;

const SecondaryText = styled.div`
  font-size: 1.25rem;
  margin-top: 0.5em;
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Home = () => {
  return (
    <>
      <Helmet>
        <title>My Portfolio</title>
      </Helmet>
      <Wrapper>
        <MainImage src={astronaut} />
        <MainTitle>Hi! I'm Kwon 👋</MainTitle>
        <SecondaryText>Check out the menu in the top right for some fun side projects!</SecondaryText>
      </Wrapper>
    </>
  );
};

export default Home;
