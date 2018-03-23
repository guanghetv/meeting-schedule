import React from 'react';
import './header.css';
import { inject, observer } from 'mobx-react';

const imgs = {
    iconUser: require('../../../assets/images/iconUser.png'),
    iconLocation: require('../../../assets/images/iconLocation.png'),
    iconComputer: require('../../../assets/images/iconComputer.png') 
}

@inject('layoutStore')
@observer
export default class Header extends React.Component {
    render() {
        const { roomInfo } = this.props.layoutStore
        return (
            <div className="Header">
                <h1>{ roomInfo.name }<span style={{color:"#999",fontSize:18}}> { roomInfo.description }</span></h1><br />
                <div className="HdContent">
                    <span style={{paddingRight: 15}}>
                        <img src={imgs.iconUser} alt=""/>
                        <i>
                          容纳人数：<em>{ roomInfo.peopleCount }</em>人  
                        </i>
                    </span>
                    <span>
                        <img src={imgs.iconLocation} alt=""/>
                        <i>位置：<em>{ roomInfo.place }</em></i>
                    </span><br /><br />
                    <span>
                        <img src={imgs.iconComputer} alt=""/>
                        <i>设备：<em>{ roomInfo.devices }</em></i>
                    </span>
                </div><br />
            </div>
        )
    }
}