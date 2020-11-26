import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Navigation = styled.nav`
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.25s;

  ${(props) => {
    if (props.visibleOnlyOnHover) {
      return `
      opacity: 0;

        :hover {
          opacity: 1;
        }
      `;
    }
  }}
`;

const NavLink = styled(Link)`
  color: ${(props) => props.theme.tickleMePink};
  display: block;
  margin-bottom: 0.5rem;
  text-align: right;

  :last-child {
    margin-bottom: 0;
  }
`;

const SiteNavigation = () => {
  const location = useLocation();

  return (
    <Navigation visibleOnlyOnHover={location.pathname !== "/"}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/game">Game</NavLink>
      <NavLink to="/weather">Weather</NavLink>
      <NavLink to="/nutrient-tracker">Macro Tracker</NavLink>
    </Navigation>
  );
};

export default SiteNavigation;
