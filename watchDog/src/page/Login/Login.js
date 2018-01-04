import React from 'react';
import { Form, Icon, Input, Button,message,notification } from 'antd';
import LoginMain from '../../../assets/images/logoMain.png';
const FormItem = Form.Item;
import axios from 'axios';
import APIs from '../../common/api.js';

class Login extends React.Component {
	constructor(props){
		super(props)
	}
	handleSubmit = (e) => {
        const data = {
            "email": 'admin@guanghe.tv',
            "nickname": 'admin'
        }
        this.props.router.push({pathname:'/index'})
        sessionStorage.setItem('nickname',data.nickname)
        sessionStorage.setItem('email',data.email)
	}
	render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form style={Style.formBg} onSubmit = { this.handleSubmit } className="login-form">
                    <h2 style={Style.Headtitle}>
                        <img src={LoginMain} />
                        <h6 style={{color:'#ccc',letterSpacing:10,paddingBottom:15}}>会议室预定</h6>
                    </h2>
                    {/* <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: '请输入邮箱!' }],
                        })(
                            <Input prefix={<Icon type="mail" style={{ fontSize: 13 }} />} placeholder="请输入邮箱" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入姓名!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="text" placeholder="请输入姓名" />
                        )}
                    </FormItem> */}
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%'}}>
                            进入
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
const Style = {
    formBg:{
        width:300,
        backgroundColor:'#fff',
        padding:15,
        position:'absolute',
        top:'30%',
        left:'42%',
    },
    Headtitle:{
        textAlign:'center'
    }
}
export default Form.create()(Login);
