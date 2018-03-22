import React from 'react'
import { hashHistory, Router, Route } from 'react-router'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Provider } from 'mobx-react'

@observer
export default class AppContainer extends React.Component {
    shouldComponentUpdate () {
        return false
    }
    render () {
        return (
            <Provider {...this.props.appStore}>
                <div style={{ height: '100%' }}>
                    <Router history={hashHistory} children={this.props.routes}/>
                </div>
            </Provider>
        )
    }
}

AppContainer.propTypes = {
    routes: PropTypes.object.isRequired,
    appStore: PropTypes.object.isRequired
}
