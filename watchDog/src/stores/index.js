import _ from 'lodash';
import layoutStore from './layoutStore.js';
import commentStore from './commentStore.js';
import modalStore from './modalStore.js';

const appStore = {};

export default ()=>{
    if(_.isEmpty(appStore)){
        const storeMap = {
            layoutStore,
            commentStore,
            modalStore
        };
        Object.keys(storeMap).forEach(store=>{      //store的首字母全部转成小写啦，不是必须
            appStore[_.lowerFirst(store)] = new storeMap[store]()
        })
    }
    return appStore
}