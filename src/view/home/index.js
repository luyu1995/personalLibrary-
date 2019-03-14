import React,{Component} from 'react';
import { Layout, Menu, Icon } from 'antd';

const {Header, Content, Footer, Sider,} = Layout;
const { SubMenu } = Menu;

export default class IndexPage extends Component{
    state = {
        theme: 'dark',
        current: '1',
    }

    render (){
        return (
            <div id="index">
                <Layout>
                    <Header  className="headerCustomer">
                        <span>您好，演示客户！</span>
                        <span>个人中心</span>
                        <span>退出</span>
                    </Header>
                    <Layout>
                        <Sider>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: "calc(100vh - 133px)" }}
                                onClick={this.handleClick}
                            >
                                <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                                    <Menu.Item key="1">option1</Menu.Item>
                                    <Menu.Item key="2">option2</Menu.Item>
                                    <Menu.Item key="3">option3</Menu.Item>
                                    <Menu.Item key="4">option4</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                                    <Menu.Item key="5">option5</Menu.Item>
                                    <Menu.Item key="6">option6</Menu.Item>
                                    <Menu.Item key="7">option7</Menu.Item>
                                    <Menu.Item key="8">option8</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                    <Menu.Item key="11">option11</Menu.Item>
                                    <Menu.Item key="12">option12</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content>

                        </Content>
                    </Layout>
                    <Layout>
                        <Footer>Copyright 2014-2019 Dalian FERO Information Technology Co.,Ltd. | All rights reserved</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        console.log(this.state)
    }
}