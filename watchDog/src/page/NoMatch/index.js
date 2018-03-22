export default () => ({
    path : '404',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const NoPath = require('./NoMatch').default
            cb(null, NoPath)
        }, '404')
    }
})