import styled from "styled-components";
import { colors } from "../../theme";

export const StyledButton = styled.button`
  background-color: ${colors.fourth};
  color: white;
  border-radius: 15px;
  border-style: none;
  width: 180px;
  font-size: 18px;
  font-weight: bold;
  margin-top:5%;
  &:hover {
    background-color: ${colors.third};
    transition: 0.2s all ease;
  }
`;