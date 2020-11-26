import React from "react";
import styled from "styled-components";

const Label = styled.label`
  font-size: 1.25rem;
`;

const TotalDisplay = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

const WrapperRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: 750;
`;

const TotalMacros = (props) => {
  const totalCarbs = props.foods.reduce((total, food) => {
    return total + (parseFloat(food.grams) * parseFloat(food.carbs)) / 100;
  }, 0);
  const totalFats = props.foods.reduce((total, food) => {
    return total + (parseFloat(food.grams) * parseFloat(food.fats)) / 100;
  }, 0);
  const totalProtein = props.foods.reduce((total, food) => {
    return total + (parseFloat(food.grams) * parseFloat(food.protein)) / 100;
  }, 0);

  return (
    <WrapperRow>
      <TotalDisplay className="total">{totalCarbs.toFixed(1)}g carbs</TotalDisplay>
      <TotalDisplay className="total">{totalFats.toFixed(1)}g fats</TotalDisplay>
      <TotalDisplay className="total">{totalProtein.toFixed(1)}g proteins</TotalDisplay>
    </WrapperRow>
  );
};

export default TotalMacros;
