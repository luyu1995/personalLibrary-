import React from 'react'
import { Card,Button,Radio,Switch  } from 'antd';
import './index.css'

const RadioGroup = Radio.Group;
export default class Bottons extends React.Component{
    state = {
        loading: false,
        iconLoading: false,
        value:1
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
        console.log(e)
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

    render(){
        return (
            <div className="page-content">
                <Card
                    size="small"
                    title="基础按钮"
                >
                    <Switch defaultChecked onChange={this.switchChange} />,
                    <Button type="primary" loading={this.state.loading}  onClick={this.test}>botton1</Button>
                    <Button loading={!this.state.loading}>botton2</Button>
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={1}>A</Radio>
                        <Radio value={2}>B</Radio>
                        <Radio value={3}>C</Radio>
                        <Radio value={4}>D</Radio>
                    </RadioGroup>
                </Card>
            </div>
        )
    }
}