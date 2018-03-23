import React from 'react';
import { Button } from 'antd';
import moment from 'moment';
import './comment.css';
import Chart from './chart.jsx';
import { inject, observer } from 'mobx-react';

@inject('commentStore')
@observer
export default class Comment extends React.Component {
    switchWeek = () => {
        this.props.commentStore.setswitchWeek(!this.props.commentStore.switchWeek)
    }
    render() {
        return(
            <div style={{width:'100%',height:'100%'}}>
                {this.todayRender()}
                <Chart />
            </div>
        )
    }
    todayRender() {
        return(
            <div className="btnDate">
                <p>今天：{moment().locale('zh-cn').format('dddd')}</p>
                <p><Button type="primary" onClick={this.switchWeek}>{this.props.commentStore.switchWeek ? '本周' : '下周' }</Button></p>
            </div>
        )
    }
}