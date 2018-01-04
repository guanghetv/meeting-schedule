import React from 'react';
import { Button, Icon, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import getWeekDays from '../../../common/weekTimes';
import axios from 'axios';
import APIs from '../../../common/api.js';
import AddIcon from '../../../../assets/images/iconAddGrey.png';
import moment from 'moment';
import DModal from '../Modal/Modal.js';
import Header from '../Header/Header.jsx';
import './Chart.css';

@inject('chartStore','modalStore')
@observer
export default class DTable extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        autorun(() => {
            this._getRoomOrder()
            this._roomStates()
        })
    }
    _roomStates () { // 设置io同步
        let _this = this
        socket.on('roomStates',function(data) {
                _this.props.chartStore.setresponseData(data)

        })
    }
    _getRoomOrder () {
        axios(`${APIs.GET_ROOM_ORDERS}${this.props.params.id}`)
            .then(res => {
            this.props.chartStore.setresponseData(res.data)
            })
            .catch(err => {
                console.warn('error ---> ', err)
            })
    }
    showCreateRoom = (item,val) => {
        const nowTime = new Date(moment().format('YYYY-MM-DD HH:mm:ss')).getTime() - 1800000
        if(val.time < nowTime) {
            message.warning('不可预定过去时间～');
            return false;
        }
        this.props.modalStore.setVisible(true)
        this.props.modalStore.setmodalData(item)
        this.props.modalStore.setisModalData(val)
    }
    _renderColumn() {
        return (
            <div>
                <div className="content">
                    <div className="timeBlock">
                        <div style={{borderBottom: '3px solid #f3f3f3', height: 21,width:'100%',paddingBottom:'48px'}}></div>
                        {
                            this.props.chartStore.times[0].map((item,key) => {
                                return(
                                    <div key={key} className="clock">{item}</div>
                                )
                            })
                        }
                    </div>
                    {
                        this.props.chartStore.switchTime ? (
                            this.props.chartStore.columnData.slice(0,7).map((item) => {
                                return (
                                    <div className="weekday" key={item.day}>
                                        {
                                            (moment().format('YYYY-MM-DD') == item.day)?(
                                                <div className="weekdayHeader">
                                                    <span style={{color:'rgb(112,157,228)'}}>{ item.day }</span>
                                                    <span style={{color:'rgb(112,157,228)'}}>{ item.week }</span>
                                                </div>
                                            ) : (
                                                <div className="weekdayHeader">
                                                    <span>{ item.day }</span>
                                                    <span>{ item.week }</span>
                                                </div>
                                            )
                                        }
                                        
                                        {
                                            item['times'].map((val,key) => {
                                                if (val.used) {
                                                    return (
                                                        <div key={val.time} className="timeSingleBlock">
                                                            <div className="create"
                                                            onClick={() => {this.showCreateRoom(item,val)}}
                                                            >
                                                                {
                                                                    (val.time == val.beginTime) ? (
                                                                        <div className="active" style={{borderTop:'2px solid #fff'}}>
                                                                        <span className="description">{val.description}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="active">
                                                                            <span>.</span>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div key={val.time} className="timeSingleBlock">
                                                            <div className="create"
                                                            onClick={() => {this.showCreateRoom(item,val)}}
                                                            >
                                                                <div className="makeMeet">
                                                                    预定
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        ) : (
                            this.props.chartStore.columnData.slice(7,14).map((item) => {
                                return (
                                    <div className="weekday" key={item.day}>
                                        <div className="weekdayHeader">
                                            <span>{ item.day }</span>
                                            <span>{ item.week }</span>
                                        </div>
                                        {
                                            item['times'].map((val,key) => {
                                                if (val.used) {
                                                    return (
                                                        <div key={val.time} className="timeSingleBlock">
                                                            <div className="create"
                                                            onClick={() => {this.showCreateRoom(item,val)}}
                                                            >
                                                                {
                                                                    (val.time == val.beginTime) ? (
                                                                        <div className="active" style={{borderTop:'2px solid #fff'}}>
                                                                            <span className="description">{val.description}</span>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="active">
                                                                            <span>.</span>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                    ) 
                                                } else {
                                                    return (
                                                        <div key={val.time} className="timeSingleBlock">
                                                            <div className="create"
                                                            onClick={() => {this.showCreateRoom(item,val)}}
                                                            >
                                                                <div className="makeMeet">
                                                                    预定
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        )
                    }
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>
                {/*------ header -----*/}
                <Header />
                {/*------- room -------*/}
                <div className="Chart">
                    <div className="CtContent">
                        <div className="calendar">
                            {this._renderColumn()}
                        </div>
                    </div>
                    {/*------- dialog --------*/}
                    <DModal
                        roomId = {this.props.params.id}
                    />
                </div>
            </div>
        )
    }
}
