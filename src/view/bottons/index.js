import React from 'react'
import { Card,Button,Radio,Switch,Modal,Spin,Icon  } from 'antd';
import './index.css'

const RadioGroup = Radio.Group;
const confirm = Modal.confirm;
export default class Bottons extends React.Component{
    state = {
        loading: false,
        iconLoading: false,
        value:1,
        visible:false
    }

    test = () =>{
        this.setState(
            {
                loading:true
            }
        )
        let _this = this
        setTimeout(function () {
            _this.setState(
                {
                    loading:false
                }
            )
        },3000)
    }
    onChange = (e) =>{
        this.setState({
            value:e.target.value
        })

    }

    switchChange = (e) =>{
        if(e){
            this.setState(
                {
                    loading:true
                }
            )
        }else{
            this.setState(
                {
                    loading:false
                }
            )
        }
    }

    //点击第三个按钮
    clickThreeButton = () =>{
        confirm({
            title: 'title',
            content: '我是需要确认的内容',
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('啊哦~出错了  '));
            },
            onCancel() {},
        });
    }
    //点击第四个按钮
    clickFourButton = () =>{
        this.setState({
            visible:true
        })

    }
    //点击确定按钮
    handleOk = () =>{
        this.setState({
            loading:true
        })
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    }
    //点击取消按钮
    handleCancel = () =>{
        this.setState({
            visible:false
        })
    }


render(){
    const { visible, loading } = this.state;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
            <Spin indicator={antIcon} tip="加载中...">
            <div className="page-content">
                <Card
                    size="small"
                    title="基础按钮"
                >
                    <Switch defaultChecked onChange={this.switchChange} />,
                    <Button type="primary" loading={this.state.loading}  onClick={this.test}>botton1</Button>
                    <Button loading={!this.state.loading}>botton2</Button>
                    <Button type="primary"  onClick={this.clickThreeButton}>botton3</Button>
                    <Button type="primary"  onClick={this.clickFourButton}>botton4</Button>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </RadioGroup>
                </Card>
                <Modal
                    title="基础弹出层"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                    ]}
                >
                    <p>可以是表单，可以使一些汉字内容，巴拉巴拉....</p>
                </Modal>
            </div>
            </Spin>
        )
    }
}