import React, {Component} from 'react';

export default class NowWeather extends Component {

    switchWeather = (weather) => {
        switch (weather) {
            case "晴":
                return (
                    <icon></icon>
                )
        }
    };

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20
            }}>
                <h1>{this.props.city}</h1>
                <div>
                    <span>{this.props.date}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>{this.props.week}</span>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <span>{this.switchWeather(this.props.weather)}</span>
                    <span style={{
                        fontSize: 100,
                        fontWeight: 600
                    }}>{this.props.temp}°
                        <span style={{
                            fontSize: 40,
                            fontWeight: 400
                        }}>C</span>
                    </span>
                </div>
                <div style={{
                    fontSize: 25
                }}>
                    {this.props.weather}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span>最高气温&nbsp;&nbsp;{this.props.temphigh}℃</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>最高气温&nbsp;&nbsp;{this.props.templow}℃</span>
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span>湿度&nbsp;&nbsp;{this.props.humidity}%</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>气压&nbsp;&nbsp;&nbsp;{this.props.pressure}Pa</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>风速&nbsp;&nbsp;{this.props.winddirect}&nbsp;{this.props.windpower}&nbsp;{this.props.windspeed}km/h</span>
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    更新时间&nbsp;&nbsp;{this.props.updatetime}
                </div>
            </div>
        )
    }
}

