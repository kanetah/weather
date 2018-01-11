import React, { Component } from 'react';
import '../style/App.css';
// import { Layout } from 'antd';
import Map from "../pages/Map";

class App extends Component {
    render() {
        return (
            <div className="App"
                 style={{
                     width: "100%",
                     height: "100%",
                 }}
            >
                <Map/>
            </div>
        );
    }
}

export default App;
