import React from 'react'
import {Row ,Col} from 'antd'
import './index.css'
import utils from '../../utils/utils'

export default class Header extends  React.Component{
    componentWillMount(){
        this.setState({
            userName:'陆宇女士'
        })
        setInterval(()=>{
            let nowTime = utils.formateDate(new Date())
            this.setState({
                nowTime
            })
        },1000)
    }
    render(){
        return (
            <div>
               <div className="login">
                   <span>欢迎，{this.state.userName}</span>
                   <a href="#">退出</a>
               </div>
                <Row>
                    <span>
                        面包屑
                    </span>
                    <span>
                        { this.state.nowTime }
                    </span>
                    <span>
                        天气
                    </span>
                </Row>
            </div>
        );
    }
    
}