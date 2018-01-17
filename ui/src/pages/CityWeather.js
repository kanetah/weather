import React, {Component} from 'react';
import TweenOne from 'rc-tween-one';
import Q from 'jquery';
import NowWeather from "./NowWeather";
import {Button} from 'antd'
import HourlyWeather from "./HourlyWeather";
import DailyWeather from "./DailyWeather";


export default class CityWeather extends Component {

    styleObj = {
        position: "fixed",
        left: 0,
        top: 50,
        zIndex: -2,
        width: "100%",
        backgroundColor: "transparent",
        opacity: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
    };

    constructor(props) {
        super(props);
        this.animation = {
            duration: 400,
            opacity: 1,
            top: 0,
        };
        this.style = this.styleObj;
        this.state = {
            moment: null,
            paused: true,
            reverse: false,
            weather: null, //天气信息
        };
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (nextProps.city !== this.props.city) {
            this.styleObj.zIndex = nextProps.city ? 2 : -2;
            this.style = this.styleObj;
            if (nextProps.city) {
                this.setState({ // play
                    paused: false,
                    reverse: false,
                    moment: null,
                });
                Q.get(`http://${document.domain}/weather/${nextProps.city}`, data => {
                    this.setState({
                        weather: JSON.parse(data)
                    });
                    console.log(JSON.parse(data));
                });
            } else
                this.setState({
                    weather: null
                });
        }
        return true;
    };

    drillUp = () => {
        this.setState({ // reverse
            paused: false,
            reverse: true,
            moment: null,
        });
        setTimeout(() => {
            this.props.drillUp();
        }, this.animation.duration);
    };

    render() {
        return (
            <TweenOne
                style={this.style}
                animation={this.animation}
                paused={this.state.paused}
                reverse={this.state.reverse}
                moment={this.state.moment}
            >
                {
                    this.state.weather ?
                        <div>
                            <NowWeather
                                city={this.props.city}
                                date={this.state.weather.result.date}
                                week={this.state.weather.result.week}
                                temp={this.state.weather.result.temp}
                                weather={this.state.weather.result.weather}
                                temphigh={this.state.weather.result.temphigh}
                                templow={this.state.weather.result.templow}
                                humidity={this.state.weather.result.humidity}
                                pressure={this.state.weather.result.pressure}
                                winddirect={this.state.weather.result.winddirect}
                                windpower={this.state.weather.result.windpower}
                                windspeed={this.state.weather.result.windspeed}
                                updatetime={this.state.weather.result.updatetime}
                            />
                            <HourlyWeather hourly={this.state.weather.result.hourly}/>
                            <DailyWeather daily={this.state.weather.result.daily}/>
                        </div>
                        : null
                }
                <Button type="danger" ghost onClick={this.drillUp}>drillUp</Button>
            </TweenOne>
        )
    }
}