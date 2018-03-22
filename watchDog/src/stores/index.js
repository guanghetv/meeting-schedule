import _ from 'lodash';
import MenuStore from './MenuStore.js';
import ChartStore from './ChartStore.js';
import ModalStore from './ModalStore.js';

const appStore = {};

export default ()=>{
    if(_.isEmpty(appStore)){
        const storeMap = {
            MenuStore,
            ChartStore,
            ModalStore
        };
        Object.keys(storeMap).forEach(store=>{      //我用来把store的首字母全部转成小写啦，不是必须
            appStore[_.lowerFirst(store)] = new storeMap[store]()
        })
    }
    return appStore
}