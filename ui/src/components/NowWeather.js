import React, {Component} from 'react';

export default class NowWeather extends Component {

    switchWeather = (weather) => {
        switch (weather) {
            case "晴":
                return (
                    <img src={require('../assets/weathercn/0.png')} alt={'*'}/>
                );
            case "多云":
                return (
                    <img src={require('../assets/weathercn/1.png')} alt={'*'}/>
                );
            case "阴":
                return (
                    <img src={require('../assets/weathercn/2.png')} alt={'*'}/>
                );
            case "阵雨":
                return (
                    <img src={require('../assets/weathercn/3.png')} alt={'*'}/>
                );
            case "雷阵雨":
                return (
                    <img src={require('../assets/weathercn/4.png')} alt={'*'}/>
                );
            case "雷阵雨伴有冰雹":
                return (
                    <img src={require('../assets/weathercn/5.png')} alt={'*'}/>
                );
            case "雨夹雪":
                return (
                    <img src={require('../assets/weathercn/6.png')} alt={'*'}/>
                );
            case "小雨":
                return (
                    <img src={require('../assets/weathercn/7.png')} alt={'*'}/>
                );
            case "中雨":
                return (
                    <img src={require('../assets/weathercn/8.png')} alt={'*'}/>
                );
            case "大雨":
                return (
                    <img src={require('../assets/weathercn/9.png')} alt={'*'}/>
                );
            case "暴雨":
                return (
                    <img src={require('../assets/weathercn/10.png')} alt={'*'}/>
                );
            case "大暴雨":
                return (
                    <img src={require('../assets/weathercn/11.png')} alt={'*'}/>
                );
            case "特大暴雨":
                return (
                    <img src={require('../assets/weathercn/12.png')} alt={'*'}/>
                );
            case "阵雪":
                return (
                    <img src={require('../assets/weathercn/13.png')} alt={'*'}/>
                );
            case "小雪":
                return (
                    <img src={require('../assets/weathercn/14.png')} alt={'*'}/>
                );
            case "中雪":
                return (
                    <img src={require('../assets/weathercn/15.png')} alt={'*'}/>
                );
            case "大雪":
                return (
                    <img src={require('../assets/weathercn/16.png')} alt={'*'}/>
                );
            case "暴雪":
                return (
                    <img src={require('../assets/weathercn/17.png')} alt={'*'}/>
                );
            case "雾":
                return (
                    <img src={require('../assets/weathercn/18.png')} alt={'*'}/>
                );
            case "冻雨":
                return (
                    <img src={require('../assets/weathercn/19.png')} alt={'*'}/>
                );
            case "沙尘暴":
                return (
                    <img src={require('../assets/weathercn/20.png')} alt={'*'}/>
                );
            case "小雨-中雨":
                return (
                    <img src={require('../assets/weathercn/21.png')} alt={'*'}/>
                );
            case "中雨-大雨":
                return (
                    <img src={require('../assets/weathercn/22.png')} alt={'*'}/>
                );
            case "大雨-暴雨":
                return (
                    <img src={require('../assets/weathercn/23.png')} alt={'*'}/>
                );
            case "暴雨-大暴雨":
                return (
                    <img src={require('../assets/weathercn/24.png')} alt={'*'}/>
                );
            case "大暴雨-特大暴雨":
                return (
                    <img src={require('../assets/weathercn/25.png')} alt={'*'}/>
                );
            case "小雪-中雪":
                return (
                    <img src={require('../assets/weathercn/26.png')} alt={'*'}/>
                );
            case "中雪-大雪":
                return (
                    <img src={require('../assets/weathercn/27.png')} alt={'*'}/>
                );
            case "大雪-暴雪":
                return (
                    <img src={require('../assets/weathercn/28.png')} alt={'*'}/>
                );
            case "浮尘":
                return (
                    <img src={require('../assets/weathercn/29.png')} alt={'*'}/>
                );
            case "扬沙":
                return (
                    <img src={require('../assets/weathercn/30.png')} alt={'*'}/>
                );
            case "强沙尘暴":
                return (
                    <img src={require('../assets/weathercn/31.png')} alt={'*'}/>
                );
            case "浓雾":
                return (
                    <img src={require('../assets/weathercn/32.png')} alt={'*'}/>
                );
            case "强浓雾":
                return (
                    <img src={require('../assets/weathercn/49.png')} alt={'*'}/>
                );
            case "霾":
                return (
                    <img src={require('../assets/weathercn/53.png')} alt={'*'}/>
                );
            case "中毒霾":
                return (
                    <img src={require('../assets/weathercn/54.png')} alt={'*'}/>
                );
            case "重毒霾":
                return (
                    <img src={require('../assets/weathercn/55.png')} alt={'*'}/>
                );
            case "严重霾":
                return (
                    <img src={require('../assets/weathercn/56.png')} alt={'*'}/>
                );
            case "大雾":
                return (
                    <img src={require('../assets/weathercn/57.png')} alt={'*'}/>
                );
            case "特强浓雾":
                return (
                    <img src={require('../assets/weathercn/58.png')} alt={'*'}/>
                );
            case "雨":
                return (
                    <img src={require('../assets/weathercn/301.png')} alt={'*'}/>
                );
            case "雪":
                return (
                    <img src={require('../assets/weathercn/302.png')} alt={'*'}/>
                );
            default:
                return (
                    <img src={require('../assets/weathercn/99.png')} alt={'*'}/>
                );
        }
    };

    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 40
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
                    <span style={{
                        alignSelf: 'center'
                    }}>
                        {this.switchWeather(this.props.weather)}
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span style={{
                        fontSize: 100,
                        fontWeight: 600
                    }}>
                        {this.props.temp}°
                        <span style={{
                            fontSize: 40,
                            fontWeight: 400
                        }}>C</span>
                    </span>
                </div>
                <div style={{
                    fontSize: 30
                }}>
                    {this.props.weather}
                </div>
                <div style={{
                    marginTop: 10
                }}>
                    <span>最高气温&nbsp;&nbsp;{this.props.temphigh}℃</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>最低气温&nbsp;&nbsp;{this.props.templow}℃</span>
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

