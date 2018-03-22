import { observable,action,computed, runInAction } from 'mobx';
import axios from 'axios';
import APIs from '../common/api.js';
import _ from 'lodash';

class MenuStore {
    @observable menuList = [];
    @observable roomId = null
    @observable SelectStr = sessionStorage.getItem('SelectStr') || 'meeting'

    @action
    async MenuList () { // 获取allRoom
        const res = await axios(`${APIs.GET_ROOMS}`,{'Content-Type': 'application/json;charset=utf8'})
        if (res.data) {
            this.menuList = res.data
        } else {
            console.warn(error)
        }
    }

    @computed
    get ListData() {
        if (_.isEmpty(this.menuList)) return [];
        let newListArr = [];
        this.menuList.map((item) => {
            if(item.type === this.SelectStr) {
                newListArr.push(item)
            }
        })
        return newListArr
    }

    @computed
    get RoomDetail () { // 获取房间详情信息
        let RoomData = {}
        const url = window.location.href;
        const num = window.location.href.lastIndexOf('/') + 1
        // const reg = /(\d+)(?!.\/.)$/
        if(_.isEmpty(this.roomId)) {
            this.roomId = url.slice(num)
            // this.roomId = url.match(reg)[0]
        }
        this.menuList.map((item, k) => {
            if (this.roomId == item.id) {
                RoomData = item
            }
        })
        return RoomData;
    }

    @action
    setSelectStr(str) {
        this.SelectStr = str
    }

    @action
    setRoomId (num) { // 房间号
        this.roomId = num
    }
}

export default MenuStore;


