import React from 'react';
import styled, {keyframes} from 'styled-components'

const NotiPanel = styled.div`
border: 1px solid white;
border-radius: 10px;
width: 300px;
height: 95vh;
margin-top:10px;
margin-bottom: 5px;
background: white;
opacity: 90%;
margin-left: 80%;
position: absolute;
z-index: 600;
text-align: center;
overflow-x: hidden;
overflow-y: auto;

`

const slide = keyframes`
from {margin-left: 50px;}
to { margin-left: 10px}
`

const Message = styled.div`
width: 270px;
  --height: 30px;
  --font-weight: bold;
  --background: white;
  margin: 3px;
  font-size: 0.9rem;
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px;
  color: white;
  border: 1px solid white;
  border-radius: 12px;
  border-bottom-right-radius: 1px;
  background:palevioletred;
  animation: ${slide} 0.6s;
  padding-left: 3px;
  text-align: center;
`



const NotificationHeader = styled.div`
padding: 3px;
background: grey;
font-weight: bold;
border-top-left-radius:9px;
border-top-right-radius:9px;
color: white;
`

class NotificationPanel extends React.Component {


    render() {
        return <NotiPanel style={{ border: this.props.theme == 'light' ? '1px solid black' : '1px solid white' }}> 
            <NotificationHeader /*style={{ background: this.props.theme == 'light' ? 'black' :'white', color: this.props.theme == 'light' ? 'white' :'black'}}*/> 
                Notification Panel
            </NotificationHeader>
            {this.props.messages.map(msg=> <Message key={msg.text} style={{ background: msg.type == 'Proximity' ? '#ff6666' : '#4d79ff' }}>{msg.text}</Message>)}
            </NotiPanel>
    }
}

export default NotificationPanel;
