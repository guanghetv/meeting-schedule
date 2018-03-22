export default  () => ({
    path: 'meet/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Meet = require('../components/DTable/Chart').default;
            // const Meet = require('./meet').default;
            cb(null, Meet)
        },'meet')
    }
})

