import React from 'react';
const height = document.body.clientHeight

const Home = () => {
    return (
        <div style={styles.content}>
            <h5>点击左侧房间，预定会议室</h5>
        </div>
    )
}
export default Home
const styles = {
    content: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: height-100
    }
}
