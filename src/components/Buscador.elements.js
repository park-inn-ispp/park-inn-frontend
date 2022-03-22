import styled from 'styled-components'

export const Input = styled.input`
    margin: 1rem;
    border-radius: 25px;
    border-style: solid;
    padding: 7px;
    width: 600px;
    background-color: lightgray;
    position: sticky;
    z-index: 2;
    
    @media screen and (max-width: 960px){
        width: 300px;
    }
`