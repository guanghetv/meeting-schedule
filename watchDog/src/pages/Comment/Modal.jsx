import React, {Component} from 'react';
import {Modal,Button, Form, Input,Select, Col, notification, Popconfirm, message} from 'antd';
import _ from 'lodash';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import moment from 'moment';

@inject('modalStore')
@observer
class Dmodal extends React.Component {
    handleCancel = () => {
        this.props.modalStore.setVisibleModal(false)
        this.props.form.resetFields()
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

    handleSubmit = () => {
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
            }
            let data = _.assign(body,values)
            console.log(data)
            this.props.modalStore.putData(data).then(res => {
                message.success('创建成功')
                this.props.modalStore.setVisibleModal(false)
            }).catch(err => {
                message.warning('创建失败')
                console.error('error ---> ', err)
            })
        })
    }

    DeleteMessage = () => {
        const stateId = this.props.modalStore.isModalData.id;
        setTimeout(() => {
            this.handleCancel()
        },10)
        const that = this
        confirm({
            title: '你确定要删除此条会议记录?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.props.modalStore.delData(that.props.roomId, stateId).then(res => {
                    message.success('删除成功')
                })
            },
            onCancel() {
                console.log('onCancel')
            },
        });
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        const { modalData, isModalData } = this.props.modalStore
        return (
            <Modal
                visible={this.props.modalStore.visibleModal}
                onCancel={this.handleCancel}
                title="会议室预定"
                footer={[]}
            >
                <Form>
                    <FormItem>
                        <Col span={11}>
                            <FormItem>
                                {getFieldDecorator('beginTime', {
                                    initialValue: isModalData.beginTime ? moment(isModalData.beginTime).format('YYYY-MM-DD HH:mm:ss') : moment(isModalData.time).format('YYYY-MM-DD HH:mm:ss')
                                })(
                                <Select
                                    placeholder="开始时间"
                                    onChange={this.handleSelectChangeBegin}
                                >
                                    {
                                        modalData.times ? (
                                            modalData.times.map(item => {
                                                return (
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
                                        <Button style={{width:'100%'}} type="primary" onClick={this.handleSubmit}>
                                            提交
                                        </Button>
                                    </Col>
                                </div>
                            ): (
                                <Button style={{width:'100%'}} type="primary" onClick={this.handleSubmit}>
                                    提交
                                </Button> 
                            )
                        }
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}

export default Form.create()(Dmodal);
