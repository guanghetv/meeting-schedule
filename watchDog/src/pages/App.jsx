import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { observer } from 'mobx-react'
import { renderRoutes } from 'react-router-config';
import routes from '../routes/index.js';
import stores from '../stores/index.js';

@observer
class App extends React.Component {
    shouldComponentUpdate () {
        return false
    }
    render() {
        return (
            <Provider {...this.props.appStore}>
                <Router>
                    {renderRoutes(routes)}
                </Router>
            </Provider> 
        )
    }
}
export default App