import { observable,action,computed } from 'mobx';
import * as mobx from 'mobx';
import _ from 'lodash';

class ModalStore {
    @observable modalData ={}
    @observable isModalData = {}
    @observable visible = false


    @action
    setmodalData(data) {
        this.modalData = data
    }

    @action
    setisModalData(data) {
        this.isModalData = data
    }

    @action
    setVisible (boolean) {
        this.visible = boolean
    }
}

export default ModalStore