import styled from "styled-components";
import { colors } from "../../theme";

export const StyledButton = styled.button`
  padding: 10px;
  background-color: ${colors.fourth};
  color: white;
  border-radius: 15px;
  border-style: none;
  width: 180px;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background-color: ${colors.third};
    transition: 0.2s all ease;
  }
`;