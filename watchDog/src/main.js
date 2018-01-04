
import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import AppContainer from './page';
import appStore from './stores';
import 'antd/dist/antd.css';

const MOUNT_NODE = document.getElementById('app')

//错误提示遮罩层 redbox-react
const renderError = (error) => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(<RedBox error={error}/>, MOUNT_NODE)
};

let init = () => {
    try {
        const routes = require('./routers/index').default;
        mobx.useStrict(false) // mobx 是否启动严格模式
        ReactDOM.render(
            <AppContainer appStore={appStore()} routes={routes}/>,
            MOUNT_NODE
        )
    } catch (e) {
       console.error(e)
        renderError(e)
    }
};

init();
