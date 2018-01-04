import React from 'react';
const height = document.body.clientHeight

export default class Home extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <div style={styles.content}>
               <h5>点击左侧房间，预定会议室</h5>
            </div>
        )
    }
}
const styles = {
    content: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: height-100
    }
}

