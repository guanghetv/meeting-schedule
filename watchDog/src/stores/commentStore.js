import { observable, action, computed, runInAction} from 'mobx';
import * as mobx from 'mobx';
import times from '../common/timeConfig.js';
import getWeekDays from '../common/weekTimes';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import APIs from '../common/api';

class CommentStore {
    @observable defaultTimes = getWeekDays();
    @observable responseData = []
    @observable times = times
    @observable switchWeek = true;
    @observable visibleModal = false;

    @action
    async fetchData(RoomId) {
        let res = await axios.get(`${APIs.GET_ROOM_ORDERS}${RoomId}`, {'Content-Type': 'application/json;charset=utf8'})
        if (res.data.data) {
            runInAction(() => {
                for(let i in res.data.data) {
                    res.data.data[i].beginTime = new Date(moment(res.data.data[i].beginTime)).getTime()
                    res.data.data[i].endTime = new Date(moment(res.data.data[i].endTime)).getTime()
                }
                const url = window.location.href;
                const num = window.location.href.lastIndexOf('/') + 1
                if(res.data.roomId && res.data.roomId == url.slice(num)) {
                    this.responseData = res.data.data
                }
            })
        } else {
            runInAction(() => {
                this.responseData = []
            })
        }
    }

    @computed
    get columnData() {
        let weeks = [];
        mobx.toJS(this.defaultTimes).map(item => {
            item['times'].map(singleItem => {
                if (_.isEmpty(this.responseData)) {
                    singleItem.used = false
                }else {
                    mobx.toJS(this.responseData).map(val => {
                        if (singleItem.time >= val['beginTime'] && singleItem.time < val['endTime'] ) {
                            singleItem.used = true
                            singleItem = _.assign(singleItem, val)
                        }
                    })
                }
            })
            weeks.push(item)
        })
        return weeks
    }

    @action
    setswitchWeek (boolean) { // 本周/下周
        this.switchWeek = boolean
    }

    @action
    setresponseData (res) {
        console.info(res)
        for (let i in res.data) {
            res.data[i].beginTime = new Date(moment(res.data[i].beginTime)).getTime()
            res.data[i].endTime = new Date(moment(res.data[i].endTime)).getTime()
        }
        const url = window.location.href;
        const num = window.location.href.lastIndexOf('/') + 1
        if(res.roomId && res.roomId == url.slice(num)) {
           this.responseData = res.data
        }
    }
}

export default CommentStore;


