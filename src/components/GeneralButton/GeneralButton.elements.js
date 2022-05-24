import styled from "styled-components";
import { colors } from "../../theme";

export const StyledButton = styled.button`
  background-color: ${colors.fourth};
  color: white;
  border-radius: 10px;
  width: 9%;
  height:9%;
  font-size: 50px;
  font-weight: bold;
  margin-top:5%;
  &:hover {
    background-color: ${colors.second};
    transition: 0.2s all ease;
  }
`;