import React, {Component} from 'react';
import Highcharts from 'highcharts/highmaps';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import $ from 'jquery';

export default class Map extends Component {

    componentDidMount = () => {
        HighchartsDrilldown(Highcharts);
        Highcharts.setOptions({
            lang: {
                drillUpText: '< 返回 “{series.name}”'
            }
        });
        let map = null,
            geochina = 'https://data.jianshukeji.com/jsonp?filename=geochina/';
        $.getJSON(geochina + 'china.json&callback=?', mapdata => {
            let data = [];
            // 随机数据
            Highcharts.each(mapdata.features, function (md, index) {
                const tmp = {
                    name: md.properties.name,
                    value: Math.floor((Math.random() * 100) + 1) // 生成 1 ~ 100 随机值
                };
                if (md.properties.drilldown) {
                    tmp.drilldown = md.properties.drilldown;
                }
                data.push(tmp);
            });
            map = new Highcharts.Map('map', {
                chart: {
                    backgroundColor: 'transparent',
                    events: {
                        drilldown: function (e) {
                            this.tooltip.hide();
                            console.log(e);
                            // 异步下钻
                            if (e.point.drilldown) {
                                let pointName = e.point.properties.fullname;
                                if (!e.point.toWeatherPage) {
                                    map.showLoading('下钻中，请稍后...');
                                    // 获取二级行政地区数据并更新图表
                                    $.getJSON(geochina + e.point.drilldown + '.json&callback=?', function (data) {
                                        data = Highcharts.geojson(data);
                                        Highcharts.each(data, function (d) {
                                            d.drilldown = d.properties.drilldown ? d.properties.drilldown : pointName;
                                            d.toWeatherPage = true;
                                            d.value = Math.floor((Math.random() * 100) + 1); // 生成 1 ~ 100 随机值
                                        });
                                        map.hideLoading();
                                        map.addSeriesAsDrilldown(e.point, {
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
                                            }
                                        });
                                        map.setTitle({
                                            text: pointName
                                        });
                                    });
                                } else {
                                    alert(pointName);
                                }
                            }
                        },
                        drillup: () => {
                            map.setTitle({
                                text: '天气预报'
                            });
                        },
                        click: e => {
                            if (!map.series[0].drilldownLevel)
                                map.drillUp();
                        }
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
                    pointFormat: '<tr><td>全称</td><td>{point.properties.fullname}</td></tr>' +
                    '<tr><td>行政编号</td><td>{point.properties.areacode}</td></tr>' +
                    '<tr><td>经纬度</td><td>{point.properties.longitude},{point.properties.latitude}</td></tr>',
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
        });
    };

    render() {
        return (
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            >
            </div>
        );
    }
}
