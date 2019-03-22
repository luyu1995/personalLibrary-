import React from 'react'
import { Menu } from 'antd';
import menuList from '../../config/menu'
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
export default class MenuList extends  React.Component{
    //react生命周期=>相当于amount
    componentWillMount(){
        const Menu = this.getMenu(menuList)
        this.setState({
            Menu
        })
    }
    // 菜单渲染
    getMenu = (data) =>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.getMenu(item.children) }
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>
                <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>

        })

    }
    render(){
        return (
            <div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['/admin/home']}
                    defaultOpenKeys={['/admin/home']}
                    mode="inline"
                >
                    {this.state.Menu}
                </Menu>
            </div>
        );
    }

}