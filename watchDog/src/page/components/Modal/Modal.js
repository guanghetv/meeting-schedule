import React from 'react';
import { Modal, Button, Form, Input,Select, Col, notification, Popconfirm, message } from 'antd';
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import moment from 'moment';
import axios from 'axios';
import APIs from '../../../common/api.js';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
import './Modal.css';

@inject('modalStore')
@observer
class showModal extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        autorun(() => {
            this.props.modalStore.modalData
            this.props.modalStore.isModalData
        })
    }
    handleSubmit = (e) => {
        let body = {
            userId: '',
            day: `${this.props.modalStore.modalData.day}`,
            roomId: this.props.roomId,
            id: '' || this.props.modalStore.isModalData.id,
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(values.description === '') {
                    message.warning('使用者和描述不能为空~')
                    return false;
                }
                if(new Date(moment(values.endTime)).getTime() < new Date(moment(values.beginTime)).getTime()) {
                    message.warning("结束时间不能大于开始时间~")
                    return false; 
                }
                if(new Date().getTime() > new Date(moment(values.endTime)).getTime()) {
                    message.warning("开始时间不能大于当前时间~")
                    return false;  
                }
                let data = Object.assign(body,values)
                axios({
                    method: 'PUT',
                    url: APIs.PUT_ROOM_STATUS,
                    data: data,
                    header: {
                        'Content-Type': 'application/json;charset=utf8'
                    }
                }).then(res => {
                    message.success('创建成功~')
                    setTimeout(() => {
                        this.handleCancel()
                    },300)
                    this.props.form.resetFields()
                }).catch(err => {
                    message.error('创建失败~')
                    setTimeout(() => {
                        this.handleCancel()
                    },300)
                    console.warn(err)
                })
            }
        });
    }
    handleSelectChangeBegin = (value) => {
        this.props.form.setFieldsValue({
            beginTime: value
        })
    }
    handleSelectChangeEnd = (value) => {
        this.props.form.setFieldsValue({
            endTime: value
        })
    }
    DeleteMessage = () => {
        const roomId = this.props.roomId;
        const stateId = this.props.modalStore.isModalData.id;
        setTimeout(() => {
            this.handleCancel()
        },10)
        confirm({
            title: '你确定要删除此条会议记录?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                axios.delete(`${APIs.DELETE_ROOM_STATUS}${roomId}/state/${stateId}`).then(res => {
                    message.success('删除成功')
                }).catch(err => {
                    console.warn('error --->', err)
                })
            },
            onCancel() {
                console.log('onCancel')
            },
        });
        this.props.form.resetFields()
    }
    handleCancel = () => {
        this.props.modalStore.setVisible(false)
        this.props.form.resetFields()
    }
    _renderForm () {
        const { getFieldDecorator } = this.props.form;
        const { isModalData, modalData, visible } = this.props.modalStore
        return (
            <Form onSubmit={this.handleSubmit}>
            <FormItem>
                <Col span={11}>
                    <FormItem>
                        {getFieldDecorator('beginTime',{
                            initialValue: isModalData.beginTime ? moment(isModalData.beginTime).format('YYYY-MM-DD HH:mm:ss') : moment(isModalData.time).format('YYYY-MM-DD HH:mm:ss')
                        })(
                            <Select
                            placeholder="开始时间"
                            onChange={this.handleSelectChangeBegin}
                            >
                           {
                              (modalData.times) ? (
                                modalData.times.map(item => {
                                    return(
                                       <Option key={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>{moment(item.time).format('HH:mm')}</Option>
                                    )
                                })
                               ) : (null)
                           }
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={2}>
                <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                    -
                </span>
                </Col>
                <Col span={11}>
                    <FormItem>
                        {getFieldDecorator('endTime',{
                            initialValue: isModalData.endTime ? moment(isModalData.endTime).format('YYYY-MM-DD HH:mm:ss') : moment(isModalData.time).format('YYYY-MM-DD HH:mm:ss')
                        })(
                            <Select
                            placeholder="结束时间"
                            onChange={this.handleSelectChangeEnd}
                            >
                                {
                                    (modalData.times) ? (
                                        modalData.times.map(item => {
                                            return(
                                            <Option key={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>{moment(item.time).format('HH:mm')}</Option>
                                            )
                                        
                                        })
                                    ) : (null)
                                } 
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem>
                {getFieldDecorator('description',{
                    initialValue: isModalData.description ? isModalData.description : ''
                })(
                    <TextArea style={{resize:'none'}} rows={2} placeholder="请添写使用者和主题" />
                )}
            </FormItem>
            <FormItem span={12}>
                {
                    (isModalData.id) ? (
                        <div>
                            <Col span={11}>
                                <Button style={{width:'100%'}} type="default" onClick={this.DeleteMessage}>
                                    删除
                                </Button>
                            </Col>
                            <Col span={2}></Col>
                            <Col span={11}>
                                <Button style={{width:'100%'}} type="primary" htmlType="submit">
                                    提交
                                </Button>
                            </Col>
                        </div>
                    ): (
                        <Button style={{width:'100%'}} type="primary" htmlType="submit">
                            提交
                        </Button> 
                    )
                }
            </FormItem>
        </Form>
        )
    }
    render() {
        const { isModalData, modalData, visible,desc } = this.props.modalStore
        return (
            <Modal
                visible={ visible }
                title= {isModalData.id ? "修改预定" : "新建预定"}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[]}
                className="showModal"
            >
                {this._renderForm()}
            </Modal>
        )
    }

}
export default Form.create()(showModal)

