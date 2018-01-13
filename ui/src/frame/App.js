import React, {Component} from 'react';
import '../style/App.css';
import Map from "../pages/Map";
import CityWeather from "../pages/CityWeather";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city: null,
            drillUp: null
        };
    };

    setCity = city => {
        this.setState({
            city: city
        })
    };

    setDrillUp = drillUp => {
        this.setState({
            drillUp: () => {
                this.setCity(null);
                drillUp();
            }
        })
    };

    render() {
        return (
            <div className="App"
                 style={{
                     width: "100%",
                     height: "100%",
                     zIndex: 0,
                     backgroundColor: "gray",
                 }}
            >
                <Map setCity={this.setCity} setDrillUp={this.setDrillUp}/>
                <CityWeather city={this.state.city} drillUp={this.state.drillUp}/>
            </div>
        );
    }
}

export default App;
