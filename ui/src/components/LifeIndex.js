import React, {Component} from 'react';
import {Table} from 'antd';

const column = [{
    title: '指数名称',
    dataIndex: 'iname',
    key: 'iname',
}, {
    title: '指数值',
    dataIndex: 'ivalue',
    key: 'ivalue',
}, {
    title: '指数详情',
    dataIndex: 'detail',
    key: 'detail',
}];

export default class LifeIndex extends Component {
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}>
                <h3>生活指数</h3>
                <Table showHeader={false} pagination={false} dataSource={this.props.index} columns={column} size={'small'} rowKey="iname"/>
            </div>
        )
    }
}