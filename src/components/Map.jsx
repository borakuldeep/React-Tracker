import React from 'react'
import { Map, TileLayer, Marker, Rectangle, Tooltip } from 'react-leaflet'
import Noti from './NotificationPanel.jsx'
import Buttons from './Buttons.jsx';
import styled, {keyframes} from 'styled-components'


let areacount = 0;
let interval;

const Header = styled.div`
z-index: 600;
background: #4d79ff;
position: absolute;
left: 50px;
padding: 5px;
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
color: white;
width: 200px;
text-align: center;
font-size: 1.1rem;
`

const slidedown = keyframes`
0% {top: -6%; }
50% { top: 50px; }
100% { top: -6%; display: none}
`

const Info = styled.div`
z-index: 600;
background: #4d79ff;
position: absolute;
left: 40%;
padding: 5px;
border-radius: 12px;
color: white;
width: 500px;
text-align: center;
font-size: 1.1rem;
top: -6%;
animation: ${slidedown} 5s;
`

 class LMap extends React.Component {
    constructor() {
        super();
        this.state = {
            devices: [
                { name: "Device 1", lat: 35.0381234, long: 32.5811234 },
  { name: "Device 2", lat: 34.8481234, long: 32.6811234 },
  { name: "Device 3", lat: 34.9581234, long: 33.0811234 },
  { name: "Device 4", lat: 35.0681234, long: 33.4811234 },
  { name: "Device 5", lat: 35.0781234, long: 33.5511234 },
  { name: "Device 6", lat: 34.8111234, long: 32.6111234 },
  { name: "Device 7", lat: 35.0281234, long: 32.5211234 }
            ],
            areas: [{name: "Area"+areacount, loc:[[34.923097034, 33.03451538], [34.923097034 + 0.1332, 33.03451538+0.1332]]}],
            notifications: [],
            map: '',
            theme: 'light',
            tile: {mode: "light", url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'},
            
            
        }
        this.sendDeviceUpdates = this.sendDeviceUpdates.bind(this);
        this.populateNotifications = this.populateNotifications.bind(this);
        this.checkCloseness = this.checkCloseness.bind(this);
        this.degreesToRadians = this.degreesToRadians.bind(this);
        this.getDistance = this.getDistance.bind(this);
        this.createArea = this.createArea.bind(this);
        this.resetDevices = this.resetDevices.bind(this);
        this.clearAreas = this.clearAreas.bind(this);
        this.changeTile = this.changeTile.bind(this);
    }

    sendDeviceUpdates() {
        //console.log("this.state = ", this.state);
        let devices = JSON.parse(JSON.stringify(this.state.devices));
        
        
        interval = setInterval(() => {
            
          devices.forEach(item => {
            let rand = Math.random();
            let add = rand < 0.5 ? rand * 0.01 * -1 : rand * 0.01;
            item.lat = item.lat + add;
            item.long = item.long + add;
          });
          this.setState({devices});

          this.populateNotifications();
        }, 1000);
      }

      populateNotifications() {
        let notifications = [];
        this.state.devices.forEach(device => {
          this.state.devices.forEach(item => {
            if (
              device.name != item.name &&
              notifications.some(
                item => item.device1 == device.name || item.device2 == device.name
              ) == false
            ) {
              //console.log(device.name, item.name);
              let dist = this.getDistance(device.lat, device.long, item.lat, item.long);
              //console.log("distance: ", dist);
              if (dist <= 10)
                notifications.push({
                  type: "Proximity",
                  device1: `${device.name}`,
                  device2: `${item.name}`,
                  text: `${device.name} is under 10 KM to ${item.name}`
                });
            }
          });
          this.state.areas.forEach(area => {
            if (this.checkCloseness(device, area)) {
              //console.log("device: ", device.name, "inside: ", area.properties.name);
              //console.log("notifications: : ", notifications);
              let itemFound = notifications.findIndex(
                item => item.device == device.name
              );
              //console.log("item found? ", itemFound);
              if (itemFound != -1)
                notifications[itemFound].text += ", [" + area.name + "]";
              else
                notifications.push({
                  type: "entered",
                  device: `${device.name}`,
                  area: `${area.name}`,
                  text: `${device.name} is in Area - [${area.name}]`
                });
            }
          });
        });
        this.setState({notifications});
    }

    //function to check if marker falls inside an area, returns boolean value
checkCloseness(marker, area) {
    let areaPoints = [];
    areaPoints[0] = area.loc[0];
    areaPoints[1] = [area.loc[0][0], area.loc[1][1]];
    areaPoints[2] = area.loc[1];
    areaPoints[3] = [area.loc[1][0], area.loc[0][1]];

    let x = marker.lat,
      y = marker.long;
    //console.log("check closeness: ", marker, " ,, ", polyPoints);
  
    let inside = false;
    for (let i = 0, j = 3; i < 4; j = i++) {
      let xi = areaPoints[i][0],
        yi = areaPoints[i][1];
      let xj = areaPoints[j][0],
        yj = areaPoints[j][1];
  
      let intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
  
    return inside;
  }
  
   degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  
  //function to check distance between two devices and return distance in km
   getDistance(lat1, lng1, lat2, lng2) {
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = this.degreesToRadians(lat2 - lat1);
    let dLong = this.degreesToRadians(lng2 - lng1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat1)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
  
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;
  
    return distance / 1000;
  }

  createArea(e) {
      //console.log(e.latlng);
      areacount += 1;
      let rect = {name: "Area"+areacount, loc:[[e.latlng.lat, e.latlng.lng], [e.latlng.lat + 0.1332, e.latlng.lng+0.1332]]};
      this.setState({areas: [...this.state.areas, rect]});
  }

  resetDevices() {
    clearInterval(interval);
    this.setState({devices: [
        { name: "Device 1", lat: 35.0381234, long: 32.5811234 },
{ name: "Device 2", lat: 34.8481234, long: 32.6811234 },
{ name: "Device 3", lat: 34.9581234, long: 33.0811234 },
{ name: "Device 4", lat: 35.0681234, long: 33.4811234 },
{ name: "Device 5", lat: 35.0781234, long: 33.5511234 },
{ name: "Device 6", lat: 34.8111234, long: 32.6111234 },
  { name: "Device 7", lat: 35.0281234, long: 32.5211234 }
    ]}, () => this.sendDeviceUpdates());
    

  }

  clearAreas() {
      this.setState({areas: []}, () => areacount = 0);
  }

  changeTile() {
    let tile = this.state.tile.mode == "light"? {mode: "dark", url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"} : {mode: "light", url: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"}
    let theme = this.state.theme == 'light'? 'dark':'light';
    this.setState({tile, theme});
  }

  componentDidMount() {
    this.sendDeviceUpdates();
  }

  render() {
    const position = [35.038, 33.181]
    return (
      <Map center={position} zoom="10" style={{width: "100%", height: "100vh"}} onContextMenu={this.createArea}>
        <Header>React Tracker Demo <div style={{fontSize: '0.7rem'}}> by Kuldeep Bora</div></Header>
        <Info> Right click on map to create tracking areas...</Info>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={this.state.tile.url}
        />
        {this.state.devices.map(item =>  <Marker position={[item.lat, item.long]} key={item.name}><Tooltip>{item.name}</Tooltip></Marker>)}
        {this.state.areas.map(item => <Rectangle key={item.name} bounds={item.loc}><Tooltip>{item.name}</Tooltip></Rectangle>)}
        <Buttons clear={this.clearAreas} reset={this.resetDevices} tile={this.changeTile} />
        <Noti messages={this.state.notifications} theme={this.state.theme}/> 
      </Map>
    )
  }
}


export default LMap;