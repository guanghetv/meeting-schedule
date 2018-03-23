import { observable, action, computed, runInAction} from 'mobx';
import axios from 'axios';
import APIs from '../common/api';

class LayoutStore {
    @observable menulists;
    @observable selectKey;
    @observable roomId;

    constructor() { // 初始化state
        this.menulists = [];
        this.selectKey = sessionStorage.getItem('selectKey') || 'meeting';
        this.roomId = window.location.href.slice(window.location.href.lastIndexOf('/') + 1)
    }

    @action
    async fetchData() {
        let res = await axios.get(`${APIs.GET_ROOMS}`, {'Content-Type': 'application/json;charset=utf8'});
        if (res.data) {
            runInAction(() => {
                this.menulists = res.data
            })
        } else {
            runInAction(() => {
                this.menulists = []
            })
        }
    }

    @computed
    get listdatas() {
        if (_.isEmpty(this.menulists)) return [];
        let newdatas = this.menulists.filter(item => item.type === this.selectKey)
        return newdatas
    }

    @computed
    get roomInfo () {
        let roominfo = {}
        this.menulists.map(item => {
            if (this.roomId == item.id) {
                roominfo = item
            }
        })
        return roominfo
    }

    @action
    setselectKey (val) {
        this.selectKey = val
    }

    @action
    setRoomId (num) { // 房间号
        this.roomId = num
    }
    
    @computed
    get RoomId () {
        return this.roomId
    }

}

export default LayoutStore;