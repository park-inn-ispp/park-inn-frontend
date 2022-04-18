import { type } from '@testing-library/user-event/dist/type'
import styled from 'styled-components'

export const Input = styled.input`
    margin: 1rem 1rem;
    border-radius: 25px;
    border-style: solid;
    padding: 7px;
    width: 500px;
    background-color: lightgray;
    @media screen and (max-width: 960px){
        width: 350px;
    }
`