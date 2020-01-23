import styled from 'styled-components';
import React from 'react'

const ResetBtn = styled.button`
padding: 5px;
height: 40px;
background: white;
margin: 3px;

`

const ClearBtn = styled.button`
padding: 5px;
height: 40px;
background: white;
margin: 3px;
`

const Container = styled.div`
z-index: 600;
margin-left: 40%;
background: #4d79ff;
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
background: white;
margin: 3px;
`



export default function Buttons(props) {
    return (
    <Container>
        <p style={{color: 'white', fontSize: '0.8rem', margin: '2px'}}> Right click to create tracking areas on map </p>
        <ResetBtn onClick={props.reset}> Reset Loc </ResetBtn>
        <ClearBtn onClick={props.clear}> Clear Areas </ClearBtn>
        <TileBtn onClick={props.tile}> Change Map </TileBtn>
    </Container>
    );
}