import React from 'react';
import { inject, observer } from 'mobx-react';
import {autorun} from 'mobx';
import { Layout, Menu, Icon, Select } from 'antd';
import './pageLayout.css';
import logoSmall from '../../../assets/images/logoSmall.png';
import avatar from '../../../assets/images/avatar.png';
const Option = Select.Option;
const { Sider, Content } = Layout

@inject('menuStore','chartStore')
@observer
export default class PageLayout extends React.Component {
    constructor(props) {
        super(props);
    };
    componentDidMount () {
        autorun(() => {
            this.props.menuStore.MenuList()
        })
    }
    SelectChange = (value) => { // 选择会议室还是面试间
        this.props.menuStore.setSelectStr(value);
    }
    onSkip = (item) => { // 跳转
        this.props.menuStore.setRoomId(item.key)
        this.props.router.push({pathname:`index/meet/${item.key}`});
        setTimeout(() => { // 跳转完时间默认置为本周  
            this.props.chartStore.setSwitchTime(true)
        },10)
    }
    render () {
        const {children, menuStore} = this.props;
        return (
            <Layout>
                <Sider style={{background:'#fff'}}>
                    <div className="logo">
                        <img className="logo_small" src={logoSmall} />
                        <header>
                            <img src={avatar}/>
                            <div className="avatar">
                                <p className="name">{ sessionStorage.getItem('nickname') }</p>
                                <p className="email">{ sessionStorage.getItem('email') }</p>
                            </div>
                            
                        </header>
                    </div>
                    <Select
                        showSearch
                        style={{width: 160,marginLeft: 15,marginBottom: 15}}
                        defaultValue={sessionStorage.getItem('SelectStr') || '会议室'}
                        onChange={this.SelectChange}
                    >
                        <Option value="meeting">会议室</Option>
                        <Option value="face">面试室</Option>
                        <Option value="voice">录音室</Option>
                    </Select>
                    <Menu mode="inline" onClick = { this.onSkip }>
                        {
                            menuStore.ListData.map((item) => {
                                if(menuStore.RoomDetail.id == item.id) {
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
                    <Content style={{ margin: '24px 16px', padding: 24, background: 'rgb(245,245,245)', minHeight: 280 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}