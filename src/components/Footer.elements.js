import styled from 'styled-components'
import { colors } from '../theme';

export const Principal = styled.div`
    background-color: #494A4C;
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-items: center;
    border-top: solid 2px;
    border-color: #373839;
    padding: 0 3rem 0 3rem;
    z-index: 32;

    @media screen and (max-width: 500px){
        display: none;
    }
`;

export const Info = styled.a`
    font-size: 1rem;
    cursor:pointer;
    text-decoration: none;
    color: ${colors.fivth};
    svg{
        margin-right: 5px;
    }

    &:hover{
        transition: 0.5s all ease;
        color: grey;
    }
`;