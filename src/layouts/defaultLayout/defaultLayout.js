import React,{Component} from 'react';
import {Layout,Menu,Icon} from 'antd';
import './defaultLayout.css'
import {Route, Switch} from 'react-router-dom'
import index from '../../router/home/index'
const {Header, Footer, Sider, Content,} = Layout;
const SubMenu = Menu.SubMenu;
export default class DefaultLayout extends Component {
    handleClick = (e) => {
        console.log('click ', e);
    }

    render(){
        return (
         <div>
             <Layout>
                 <Header>
                     我的
                 </Header>
                 <Layout>
                     <Sider>
                         <Menu theme="dark" mode="inline"  onClick={this.handleClick}   defaultSelectedKeys={['1']}
                               defaultOpenKeys={['456']}>
                             <SubMenu key="456" title={<span><Icon type="appstore" /><span>Navigation one</span></span>}>
                                 <Menu.Item key="1">Option 1</Menu.Item>
                                 <Menu.Item key="2">Option 2</Menu.Item>
                             </SubMenu>
                             <SubMenu key="2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                                 <Menu.Item key="3">Option 3</Menu.Item>
                                 <Menu.Item key="4">Option 4</Menu.Item>
                             </SubMenu>
                             <SubMenu key="3" title={<span><Icon type="appstore" /><span>Navigation three</span></span>}>
                                 <Menu.Item key="5">Option 5</Menu.Item>
                                 <Menu.Item key="6">Option 6</Menu.Item>
                             </SubMenu>
                         </Menu>
                     </Sider>
                     <Content className = 'content'>main content</Content>
                 </Layout>
                 <Footer>footer</Footer>
             </Layout>
             <div>
                 <Route path={this.props.match.url  + '/'} component={index} exact />
             </div>
         </div>
        )
    }

}