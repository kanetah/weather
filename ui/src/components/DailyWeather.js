import React, {Component} from 'react';
import Highcharts from 'highcharts';

export default class DailyWeather extends Component {

    componentDidMount = () => {
        const date = [];
        const week = [];
        const weather = [];
        const temphigh = [];
        const templow = [];
        const sunrise = [];
        const sunset = [];
        this.props.daily.map(value => {
            date.push(value.date);
            week.push(value.week);
            weather.push(value.day.weather);
            temphigh.push(parseInt(value.day.temphigh));
            templow.push(parseInt(value.night.templow));
            sunrise.push(value.sunrise);
            sunset.push(value.sunset);
        });
        let chart = Highcharts.chart('daily', {
            chart: {
                type: 'line',
                backgroundColor: 'transparent'
            },
            credits: {
                enabled: false
            },
            title: {
                text: '未来7天天气'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: date
            },
            yAxis: {
                title: false,
                labels: false
            },
            tooltip: {
                shared: true,
                borderRadius: 10,
                style: {
                    fontSize: "16px"
                },
                formatter: function () {
                    const index = this.points[0].point.index;
                    return '<span style="font-size: 12px">' + this.x + ' | ' + week[index] + '</span><br/>' +
                        '<span style="font-size: 20px;">' + weather[index] + '</span><br/>' +
                        '<span>最高气温:' + this.points[0].y + '℃</span><br/>' +
                        `<span>最低气温: ${this.points[1].y}℃</span><br/>` +
                        '<span>日出:' + sunrise[index] + '</span><br/>' +
                        '<span>日落:' + sunset[index] + '</span><br/>';
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
            series: [
                {data: temphigh},
                {data: templow}
            ]
        });
    };

    render() {
        return (
            <div
                id={'daily'}
                style={{
                    width: 700,
                    height: 300,
                    margin: '0 auto'
                }}>
            </div>
        )
    }
}
