import React, { useState } from "react";
import styled from "styled-components";

import Food from "./Food";
import AddFood from "./AddFood";
import TotalMacros from "./TotalMacros";

const MacroTable = styled.table`
  border-spacing: 0.25rem;

  th {
    min-width: 10rem;
    white-space: nowrap;
  }
`;

const Tracker = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 37.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  width: 100%
  height: 100%;
  
  p {
    margin: 0 0 1.5em;
  }
`;

const MacronutrientTracker = () => {
  const [foods, setFoods] = useState([{ carbs: 0, fats: 3.6, grams: 0, name: "Chicken Breast", protein: 31 }]);

  const changeAmount = (index, newAmount) => {
    const grams = newAmount.currentTarget.value.trim();
    if (grams) {
      setFoods(foods.map((food, i) => (i === index ? { ...food, grams: grams } : food)));
    } else {
      setFoods(foods.map((food, i) => (i === index ? { ...food, grams: 0 } : food)));
    }
  };

  return (
    <Wrapper>
      <Tracker>
        <h1>Macronutrient Tracker</h1>
        <p>Perfect for tracking your macronutrient intake over any period of time!</p>
        <MacroTable>
          <thead>
            <tr>
              <th>Food Name</th>
              <th>Carbs/100g</th>
              <th>Fats/100g</th>
              <th>Protein/100g</th>
              <th>Amount (g)</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => {
              return (
                <Food
                  carbs={food.carbs}
                  fats={food.fats}
                  key={index}
                  name={food.name}
                  onChangeAmount={(newAmount) => {
                    changeAmount(index, newAmount);
                  }}
                  protein={food.protein}
                />
              );
            })}
            <AddFood
              onAddFood={(newFood) => {
                setFoods([...foods, { ...newFood, grams: 0 }]);
              }}
            />
          </tbody>
        </MacroTable>
        <TotalMacros foods={foods} />
      </Tracker>
    </Wrapper>
  );
};

export default MacronutrientTracker;
