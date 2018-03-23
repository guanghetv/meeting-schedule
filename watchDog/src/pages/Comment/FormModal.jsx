import React, {Component} from 'react';
import {Modal,Button, Form, Input,Select, Col, notification, Popconfirm, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const confirm = Modal.confirm;
import { inject, observer } from 'mobx-react';
import { autorun } from 'mobx';
import moment from 'moment';

@inject('modalStore')
@observer
class FormModal extends Component {
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
        this.props.form.validateFields((err, value) => {
            if (!err) {
                console.log(value)
            }
        })
    }
    
    render () {
        const { getFieldDecorator } = this.props.form;
        const { modalData, isModalData } = this.props.modalStore
        return (
            <Form onSubmit={this.handleSubmit} fields="1">
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
}


// export default Form.create()(FormModal);
