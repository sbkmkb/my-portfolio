import React from "react";
import styled from "styled-components";

import Artwork from "./Artwork";
import Pages from "./Pages";

const ArtworkSection = styled.div`
  flex: 0 auto;
  height: 100%;
  width: 25%;
`;

const ContentSection = styled.div`
  box-shadow: 0 0 10px ${(props) => props.theme.mortar};
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const Wrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  width: 100%;
`;

const Root = () => {
  return (
    <Wrapper>
      <ArtworkSection>
        <Artwork />
      </ArtworkSection>
      <ContentSection>
        <Pages />
      </ContentSection>
    </Wrapper>
  );
};

export default Root;
