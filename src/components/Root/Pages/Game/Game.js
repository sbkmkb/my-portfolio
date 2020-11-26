import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import background1 from "./assets/background1.png";
import background2 from "./assets/background2.png";
import background3 from "./assets/background3.png";
import background4 from "./assets/background4.png";
import background5 from "./assets/background5.png";
import grass from "./assets/grass.png";
import running from "./assets/running.gif";
import standing from "./assets/standing.gif";

const characterWidth = 100;
const grassHeight = 80;
const travelDistance = 5;

const CharacterLeft = styled.img.attrs({
  src: standing,
})`
  height: 8rem;
  width: 5rem;
  transform: scaleX(-1);
`;

const CharacterLeftRunning = styled.img.attrs({
  src: running,
})`
  height: 8rem;
  width: 5rem;
  transform: scaleX(-1);
`;

const CharacterRight = styled.img.attrs({
  src: standing,
})`
  height: 8rem;
  width: 5rem;
`;

const CharacterRightRunning = styled.img.attrs({
  src: running,
})`
  height: 8rem;
  width: 5rem;
`;

const GameEnvironment = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Grass = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 5rem;
  background-image: url(${grass});
  background-size: 5.625rem;
  z-index: 7;
`;

const HitBox = styled.div`
  position: absolute;
  z-index: 7;
  height: 7.5rem;
`;

const Instructions = styled.div`
  color: white;
  font-size: 1.5rem;
  left: 50%;
  position: absolute;
  top: 6.25rem;
  transform: translateX(-50%);
`;

const SceneryWrapper = styled.div`
  background-image: url(${background5}), url(${background4}), url(${background3}), url(${background2}),
    url(${background1});
  background-size: auto 100%;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Game = () => {
  const [direction, setDirection] = useState("right");
  const [isRunning, setIsRunning] = useState(false);
  const [charPos, setCharPos] = useState({
    bottom: grassHeight,
    left: window.innerWidth / 3 - characterWidth,
  });

  const sceneryRef = useRef();
  const keyDown = useRef(false);

  useEffect(() => {
    const sceneryDimensions = sceneryRef.current.getBoundingClientRect();
    const max = sceneryDimensions.width - characterWidth;
    let runInterval;

    const runRight = () => {
      runInterval = setInterval(() => {
        setCharPos({
          ...charPos,
          left: Math.max(0, Math.min(max, (charPos.left += travelDistance))),
        });
      }, 10);
    };

    const runLeft = () => {
      runInterval = setInterval(() => {
        setCharPos({
          ...charPos,
          left: Math.max(0, Math.min(max, (charPos.left -= travelDistance))),
        });
      }, 10);
    };

    const handleKeyDown = (evt) => {
      if (keyDown.current) return;
      keyDown.current = true;
      if (evt.key === "ArrowRight") {
        setDirection("right");
        setIsRunning(true);
        runRight();
      } else if (evt.key === "ArrowLeft") {
        setDirection("left");
        setIsRunning(true);
        runLeft();
      }
    };

    const handleKeyUp = () => {
      keyDown.current = false;
      clearInterval(runInterval);
      setIsRunning(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <GameEnvironment>
      <SceneryWrapper ref={sceneryRef}>
        <Instructions>Try moving to the left/right!</Instructions>
        <Grass />
        <HitBox style={{ bottom: `${charPos.bottom}px`, left: `${charPos.left}px` }}>
          {direction === "left" && isRunning ? (
            <CharacterLeftRunning />
          ) : direction === "right" && isRunning ? (
            <CharacterRightRunning />
          ) : direction === "left" ? (
            <CharacterLeft />
          ) : (
            <CharacterRight />
          )}
        </HitBox>
      </SceneryWrapper>
    </GameEnvironment>
  );
};

export default Game;
