import React from 'react';
import ReactDOM from 'react-dom';
import * as mobx from 'mobx';
import 'antd/dist/antd.css';
import App from './pages/App.jsx';
import stores from './stores/index.js';
import { AppContainer } from 'react-hot-loader';

const MOUNT_NODE = document.getElementById('root')

//错误提示遮罩层 redbox-react
const renderErr = (error) => {
    const RedBox = require('redbox-react').default;
    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
}

let init = () => {
    try {
        mobx.useStrict(true) // 是否启用严格模式，严格模式下只能通过action 改变state
        ReactDOM.render(
            <AppContainer>
                <App appStore={stores()} />
            </AppContainer>,
            MOUNT_NODE
        )
    }catch (err) {
        console.error('error --->', err )
        renderErr(err)
    }
}
init()

