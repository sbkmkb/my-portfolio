import React, { useState } from "react";
import styled from "styled-components";

const Row = styled.tr`
  .food {
    width: 200px;
    text-align: left;
  }
`;
const NutrientInput = styled.input`
  font-size: 1rem;
  box-sizing: border-box;
  text-align: center;
  border: none;
  border-bottom: 1px solid #c9c6c6;
  width: 100%;
  outline: none;

  &:focus {
    border-bottom: 1px solid ${(props) => props.theme.tickleMePink};
  }
`;

const Cell = styled.td`
  box-sizing: border-box;
  text-align: center;
  padding: 5px 2px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AddFood = (props) => {
  const [nutrients, setNutrients] = useState({
    carbs: "",
    fats: "",
    name: "",
    protein: "",
  });

  const { carbs, fats, name, protein } = nutrients;
  const isEnabled = name.trim() && fats && carbs && protein;

  return (
    <Row>
      <Cell>
        <NutrientInput
          className="food"
          onChange={(evt) => {
            setNutrients({ ...nutrients, name: evt.currentTarget.value });
          }}
          required
          type="text"
          value={name}
        />
      </Cell>
      <Cell>
        <NutrientInput
          onChange={(evt) => {
            setNutrients({ ...nutrients, carbs: evt.currentTarget.value });
          }}
          required
          step="any"
          type="number"
          value={carbs}
        />
      </Cell>
      <Cell>
        <NutrientInput
          onChange={(evt) => {
            setNutrients({ ...nutrients, fats: evt.currentTarget.value });
          }}
          required
          step="any"
          type="number"
          value={fats}
        />
      </Cell>
      <Cell>
        <NutrientInput
          onChange={(evt) => {
            setNutrients({ ...nutrients, protein: evt.currentTarget.value });
          }}
          required
          step="any"
          type="number"
          value={protein}
        />
      </Cell>
      <Cell>
        <ButtonWrapper>
          <button
            disabled={!isEnabled}
            onClick={() => {
              props.onAddFood(nutrients);
              setNutrients({ carbs: "", fats: "", name: "", protein: "" });
            }}
          >
            Add Food
          </button>
        </ButtonWrapper>
      </Cell>
    </Row>
  );
};

export default AddFood;
