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
        console.log(JSON.stringify(weather));
        let chart = Highcharts.chart('container', {
            chart: {
                type: 'line',
                backgroundColor:'transparent'
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
                pointFormatter: function () {
                    return this.y + '℃ | ' + weather[this.index];
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
                id={'container'}
                style={{
                    width: 1200,
                    height: 200
                }}>
            </div>
        )
    }
}
