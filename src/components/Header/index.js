import React from 'react'
import {Row ,Col} from 'antd'
import './index.css'
import utils from '../../utils/utils'
import axios from '../../axios/index'

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
        this.getWeatherApiData()
    }
    getWeatherApiData(){
        let city = '北京'
        axios.Jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+ encodeURIComponent(city)+ '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status === 'success'){
                let weatherData = res.results[0].weather_data[0].weather
                this.setState({
                    weatherData
                })
            }

        })
    }
    render(){
        return (
            <div>
                <Row>
                    <Col span={24} >
                        <div className='login'>
                            <span>欢迎，{this.state.userName}</span>
                            <a href="#">退出</a>
                        </div>
                    </Col>
                </Row>
                <Row className='header'>
                    <Col span={5}>
                        <span className='header-crumbs'>
                            首页
                        </span>
                    </Col>
                    <Col span={19}>
                        <span className='header-right-content'>
                             <span className='header-time'>
                            { this.state.nowTime }
                        </span>
                        <span className='header-weather'>
                             { this.state.weatherData }
                        </span>
                        </span>
                    </Col>
                </Row>
            </div>
        );
    }
    
}