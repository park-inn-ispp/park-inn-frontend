import styled from 'styled-components'

export const Input = styled.input`
    margin: 1rem -45rem;
    border-radius: 25px;
    border-style: solid;
    padding: 7px;
    width: 500px;
    background-color: lightgray;
    position: absolute;
    z-index: 32;
    @media screen and (max-width: 960px){
        width: 350px;
    }
`