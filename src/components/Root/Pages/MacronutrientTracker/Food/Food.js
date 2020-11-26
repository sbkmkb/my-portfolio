import React from "react";
import styled from "styled-components";

const AmountInput = styled.input`
  font-size: inherit;
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

const Food = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td align="center">{props.carbs}</td>
      <td align="center">{props.fats}</td>
      <td align="center">{props.protein}</td>
      <td>
        <AmountInput onChange={props.onChangeAmount} type="number" />
      </td>
    </tr>
  );
};

export default Food;
