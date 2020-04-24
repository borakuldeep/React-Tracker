import styled from 'styled-components';
import React from 'react'

const Btn = styled.button`
background-color: #F9A300;
border: none;
height: 40px;
padding: 5px 15px;
color: #ffffff;
font-size: 16px;
font-weight: 300;
margin-top: 10px;
margin-right: 10px;
border-radius: 9px;

&:hover {
    cursor: pointer;
    background-color: #FABD44;
}
`

const ClearBtn = styled.button`
padding: 5px;
height: 40px;
background: #4d79ff;
margin: 3px;
outline: none;
border-radius: 7px;
color: white;
`

const Container = styled.div`
z-index: 600;
margin-left: 40%;
background: transparent;
position: absolute;
padding: 5px;
text-align: center;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
top:91%;
`

const TileBtn = styled.button`
padding: 5px;
height: 40px;
background: #4d79ff;
margin: 3px;
outline: none;
border-radius: 7px;
color: white;
`

const ClickInfo = styled.p`
margin-bottom: 0.5px;
color: ${props => props.theme === 'light'? 'black': 'white'};
fontSize: 0.8rem;
`


export default function Buttons(props) {
    return (
    <Container>
        <ClickInfo theme={props.theme}> Right click to create tracking areas on map </ClickInfo>
        <Btn onClick={props.reset}> Reset Loc </Btn>
        <Btn onClick={props.clear}> Clear Areas </Btn>
        <Btn onClick={props.tile}> Change Map </Btn>
    </Container>
    );
}