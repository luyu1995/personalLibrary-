import {Col, Row} from "antd";
import Menu from "../../components/Menu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import './index.css'

export default class Home extends React.Component{
    render(){
        return (
            <Row>
                <Col span={3} className="nav-left">
                    <Menu></Menu>
                </Col>
                <Col span={21} className="content-right">
                    <Header></Header>
                    {this.props.children}
                    <Footer></Footer>
                </Col>
            </Row>
        )
    }
}