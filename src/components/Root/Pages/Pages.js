import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";

import Game from "./Game";
import Home from "./Home";
import MacronutrientTracker from "./MacronutrientTracker";
import SiteNavigation from "./SiteNavigation";
import WeatherGraph from "./WeatherGraph";

const AnimatedPage = styled(animated.div)`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const Pages = () => {
  const location = useLocation();
  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translateY(100%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    initial: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateY(-50%)" },
  });

  return (
    <Wrapper>
      {transitions.map(({ item, props, key }) => (
        <AnimatedPage key={key} style={props}>
          <Switch location={item}>
            <Route path="/game" component={Game} />
            <Route path="/weather" component={WeatherGraph} />
            <Route path="/nutrient-tracker" component={MacronutrientTracker} />
            <Route path="/" component={Home} />
          </Switch>
        </AnimatedPage>
      ))}
      <SiteNavigation />
    </Wrapper>
  );
};

export default Pages;
