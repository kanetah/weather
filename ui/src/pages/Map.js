import React, {Component} from 'react';
import TweenOne from 'rc-tween-one';
import Highcharts from 'highcharts/highmaps';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import $ from 'jquery';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.animation = {
            blur: '10px',
            duration: 400,
            opacity: 0,
            scale: 2,
        };
        this.style = {
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
        };
        this.state = {
            moment: null,
            paused: true,
            reverse: false,
        };
        this.map = null;
    }

    componentDidMount = () => {
        HighchartsDrilldown(Highcharts);
        let geochina = 'https://data.jianshukeji.com/jsonp?filename=geochina/';
        $.getJSON(geochina + 'china.json&callback=?', mapdata => {
            const data = [];
            Highcharts.each(mapdata.features, md => {
                const tmp = {
                    name: md.properties.name,
                };
                if (md.properties.drilldown)
                    tmp.drilldown = md.properties.drilldown;
                data.push(tmp);
            });
            const than = this;
            this.map = new Highcharts.Map('map', {
                chart: {
                    backgroundColor: 'transparent',
                    margin: [50, 0, 10, 0],
                    events: {
                        drilldown: function(e) {
                            this.tooltip.hide();
                            // 异步下钻
                            if (e.point.drilldown) {
                                let pointName = e.point.properties.fullname;
                                if (!e.point.toWeatherPage) {
                                    than.map.showLoading("加载中...");
                                    // 获取二级行政地区数据并更新图表
                                    $.getJSON(geochina + e.point.drilldown + '.json&callback=?', data => {
                                        data = Highcharts.geojson(data);
                                        Highcharts.each(data, d => {
                                            d.drilldown = d.properties.drilldown ? d.properties.drilldown : pointName;
                                            d.toWeatherPage = true;
                                        });
                                        than.map.hideLoading();
                                        than.map.addSeriesAsDrilldown(e.point, {
                                            name: e.point.name,
                                            data: data,
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}'
                                            },
                                            states: {
                                                hover: {
                                                    color: '#0066CC'
                                                }
                                            },
                                            point: {
                                                events: {
                                                    click: e =>
                                                        than.showWeatherPage(e.point.properties.fullname, e)
                                                }
                                            },
                                        });
                                        than.map.setTitle({
                                            text: pointName
                                        });
                                    });
                                }
                            }
                        },
                        drillup: () =>
                            than.map.setTitle({text: '天气预报'}),
                        click: e =>
                            !than.map.series[0].drilldownLevel ? than.map.drillUp() : null,
                    },
                },
                title: {
                    text: '天气预报'
                },
                mapNavigation: {
                    enabled: true,
                },
                tooltip: {
                    useHTML: true,
                    headerFormat: '<table><tr><td>{point.name}</td></tr>',
                    pointFormat: `
<tr><td>全称</td><td>{point.properties.fullname}</td></tr>
<tr><td>行政编号</td><td>{point.properties.areacode}</td></tr>
<tr><td>经纬度</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>`,
                    footerFormat: '</table>'
                },
                series: [{
                    data: data,
                    mapData: mapdata,
                    joinBy: 'name',
                    name: '全国',
                    states: {
                        hover: {
                            color: '#0066CC'
                        }
                    }
                }],
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
            });
            this.map.series[0].drilldownLevel = true;
        });
    };

    showWeatherPage = (cityName, e) => {
        this.setState({ // play
            paused: false,
            reverse: false,
            moment: null,
        });
        setTimeout(() => {
            this.props.setCity(cityName);
            this.props.setDrillUp(() => {
                this.setState({ // reverse
                    paused: false,
                    reverse: true,
                    moment: null,
                });
            });
        }, this.animation.duration);
    };

    render() {
        return (
            <TweenOne
                id="map"
                style={this.style}
                animation={this.animation}
                paused={this.state.paused}
                reverse={this.state.reverse}
                moment={this.state.moment}
            >
            </TweenOne>
        );
    }
}
