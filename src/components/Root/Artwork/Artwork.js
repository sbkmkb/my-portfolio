import React from "react";
import { matchPath, useLocation } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";

import gameTile from "./game-tile.jpg";
import homeTile from "./home-tile.png";
import weatherTile from "./weather-tile.png";
import foodTile from "./food-tile.png";

const AnimatedTile = styled(animated.div)`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const PATH_TILES = [
  {
    path: "/game",
    tile: gameTile,
  },
  {
    path: "/nutrient-tracker",
    tile: foodTile,
  },
  {
    path: "/weather",
    tile: weatherTile,
  },
  {
    path: "/",
    tile: homeTile,
  },
];

const getTileForPath = (currentPath) => {
  const matchedPath = PATH_TILES.find(({ path, tile }) => {
    return matchPath(currentPath, { path });
  });

  return matchedPath.tile;
};

const Artwork = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    initial: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <Wrapper>
      {transitions.map(({ item, props, key }) => (
        <AnimatedTile
          key={key}
          style={{
            ...props,
            backgroundImage: `url(${getTileForPath(item.pathname)})`,
          }}
        ></AnimatedTile>
      ))}
    </Wrapper>
  );
};

export default Artwork;
