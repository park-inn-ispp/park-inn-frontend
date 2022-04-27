import styled from "styled-components";
import { colors } from "../theme";

export const Container = styled.div`
  width:  100%;
  height: 100vh;
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  background-image: url(https://media.istockphoto.com/vectors/city-map-with-some-location-tags-vector-id1249110424?k=20&m=1249110424&s=612x612&w=0&h=b18q3PPUpRh1sijxsdOQnFNO6nvidTAFqXr0B_swlCE=);
  background-size:cover;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.h1`
    width: 100%;
    border-style: solid;
    background-color: #1A5097;
    border-color: ${colors.fivth};
    color: white;
    padding: 10px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-bottom: 10%;

    @media screen and (max-width:600px){
        margin-bottom: 40%;
    }  
`;

export const Line = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    border-bottom-style: solid;
    border-width: 0.5px;
    border-color: gray;
    padding-bottom: 12px;
    margin: auto;
    background-color: white;
    border-radius: 10px;

`;

