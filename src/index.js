import React from 'react';
import ReactDOM from 'react-dom';
import Map from './components/Map.jsx';


class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Map/>
            </React.Fragment>)
        
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));