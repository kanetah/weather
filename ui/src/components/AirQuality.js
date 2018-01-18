import React, {Component} from 'react';

export default class AirQuality extends Component {
    render() {
        const aqi = this.props.aqi;
        return (
            <div style={{
                height: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 40,
            }}>
                <h3 style={{marginBottom: 0}}>空气质量</h3>
                <div>发布时间：{aqi.timepoint}</div>
                <div>AQI指数：{aqi.aqi}</div>
                <div>等级：{aqi.aqiinfo.level}</div>
                <div>{aqi.aqiinfo.affect}</div>
                <div>{aqi.aqiinfo.measure}</div>
                <div>首要污染物：{aqi.primarypollutant}</div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginRight: 40,
                    }}>
                        <span>PM2.5指数：{aqi.ipm2_5}</span>
                        <span>二氧化硫指数：{aqi.iso2}</span>
                        <span>一氧化碳指数：{aqi.ico}</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}>
                        <span>PM10指数：{aqi.ipm10}</span>
                        <span>二氧化氮指数：{aqi.ino2}</span>
                        <span>臭氧指数：{aqi.io3}</span>
                    </div>
                </div>
            </div>
        )
    }
}