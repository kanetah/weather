import React, {Component} from 'react';
import Highcharts from 'highcharts';

export default class HourlyWeather extends Component {

    componentDidMount = () => {
        const time = [];
        const temp = [];
        const weather = [];
        this.props.hourly.map(value => {
            time.push(value.time);
            temp.push(parseInt(value.temp));
            weather.push(value.weather);
        });
        let chart = Highcharts.chart('hourly', {
            chart: {
                type: 'line',
                backgroundColor: 'transparent'
            },
            credits: {
                enabled: false
            },
            title: {
                text: '未来24小时天气'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: time
            },
            yAxis: {
                title: false,
                labels: false
            },
            tooltip: {
                borderRadius: 10,
                style: {
                    fontSize: "16px"
                },
                formatter: function () {
                    const index = this.point.index;
                    return `<span style="font-size: 14px">${this.x}</span><br/>` +
                        `<span>${weather[index]} | ${this.y}℃</span>`;

                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + "℃";
                        },
                    }
                }
            },
            series: [{
                data: temp
            }]
        });
    };

    render() {
        return (
            <div
                id={'hourly'}
                style={{
                    width: 1200,
                    height: 200,
                    alignSelf: 'center'
                }}>
            </div>
        )
    }
}
