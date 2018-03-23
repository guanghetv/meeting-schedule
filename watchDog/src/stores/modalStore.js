import { observable,action,computed } from 'mobx';
import * as mobx from 'mobx';
import _ from 'lodash';
import axios from 'axios';
import APIs from '../common/api';

class ModalStore {
    @observable modalData ={}
    @observable isModalData = {}
    @observable visibleModal = false

    @action
    setmodalData(data) {
        this.modalData = data
    }

    @action
    setisModalData(data) {
        this.isModalData = data
    }

    @action
    setVisibleModal (boolean) {
        this.visibleModal = boolean
    }

    // 创建
    async putData (data) {
        let res = await axios({
            method: 'PUT',
            url: `${APIs.PUT_ROOM_STATUS}`,
            data: data,
            header: {
                'Content-Type': 'application/json;charset=utf8'
            }
        })
    }

    // 删除
    async delData (roomId, stateId) {
        let res = await axios.delete(`${APIs.DELETE_ROOM_STATUS}${roomId}/state/${stateId}`)
    }
}

export default ModalStore