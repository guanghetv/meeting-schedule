import React from 'react';
import {Switch,Route} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Layout, Menu, Icon, Select } from 'antd';
const { Header, Sider, Content } = Layout;
import { inject, observer } from 'mobx-react';
import './layoutPage.css';
import { autorun } from 'mobx';

const imgs = {
    logoSmall: require('../../../assets/images/logoSmall.png'),
    avatar: require('../../../assets/images/avatar.png')
}
@inject('layoutStore')
@observer
class LayoutaPage extends React.Component {
    componentWillMount () {
        autorun(() => {
            this.props.layoutStore.fetchData()
        })
    }
    SelectChange = (value) => {
        this.props.layoutStore.setselectKey(value)
        sessionStorage.setItem('selectKey', value)
    }
    Click = ({key}) => {
        const { layoutStore, history } = this.props
        layoutStore.setRoomId(key)
        history.push({pathname: `/index/meet/${key}`})
    }
    render() {
        const { listdatas, roomInfo } = this.props.layoutStore
        return (
            <Layout>
                <Sider style={{background:'#fff',height:'100%',overflow:'scroll hidden'}}>
                    <div className="logo" >
                        <img src={imgs.logoSmall} className="logo_small"/>
                        <header>
                            <img src={imgs.avatar} />
                            <div className="avatar">
                                <p className="name">admin</p>
                                <p className="email">admin@guanghe.tv</p>
                            </div>
                        </header>
                    </div>
                    <Select
                        showSearch
                        style={{width: 160,marginLeft: 15,marginBottom: 15}}
                        defaultValue={sessionStorage.getItem('selectKey') || '会议室'}
                        onChange={this.SelectChange}
                    >
                        <Select.Option value="meeting">会议室</Select.Option>
                        <Select.Option value="face">面试室</Select.Option>
                        <Select.Option value="voice">录音室</Select.Option>
                    </Select>
                    <Menu mode="inline" onClick={this.Click}>
                        {
                           listdatas.map(item => {
                                if(roomInfo.id == item.id) {
                                    return(
                                        <Menu.Item key={item.id} className="trigger Layoutactive">
                                            <span>{ item.name }</span>
                                        </Menu.Item> 
                                    )
                                }else {
                                    return(
                                        <Menu.Item key={ item.id } className="trigger">
                                            <span>{ item.name }</span>
                                        </Menu.Item> 
                                    )  
                                }
                           }) 
                        }
                    </Menu>
                </Sider>
                <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                </Header>
                <Content style={{ margin: '24px 16px', padding: 24, background: 'rgb(245,245,245)', minHeight: 280 }}>
                     {renderRoutes(this.props.route.routes)}
                </Content>
                </Layout>
            </Layout>
        )
    }
}


export default LayoutaPage