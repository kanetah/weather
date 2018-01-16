import React, {Component} from 'react';
// import Background from '../pages/Background';
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
            <div className="App">
                {/*<Background/>*/}
                <Map setCity={this.setCity} setDrillUp={this.setDrillUp}/>
                <CityWeather city={this.state.city} drillUp={this.state.drillUp}/>
            </div>
        );
    }
}

export default App;
