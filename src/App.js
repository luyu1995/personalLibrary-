import React, { Component } from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './view/home'
import Menu from './components/Menu'
import {Row, Col} from 'antd'
import './App.css'

class App extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={3} className="nav-left">
                        <Menu></Menu>
                    </Col>
                    <Col span={21} className="content-right">
                        <Header></Header>
                        <Home></Home>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
