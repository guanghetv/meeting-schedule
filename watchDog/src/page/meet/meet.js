import React from 'react';
import DTable from '../components/DTable/Chart.js';

export default class Meet extends React.Component{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log(1)
    }
    componentDidUpdate(nextProps) {
        console.log(1)
    }
    render() {
        return (
            <div>
                <DTable />
            </div>
        )
    }
}