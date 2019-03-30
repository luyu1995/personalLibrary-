import React from 'react'
import { Input,Mention  } from 'antd';
import './index.css'

export default class Bottons extends React.Component{
    state = {
        suggestions:['张三','李四','王二麻子'],
        tags : ['1.0', '2.0', '3.0']
    }
    onChange(){

    }
    onSearchChange = (value, trigger) => {
        console.log('onSearchChange', value, trigger);
        const dataSource = trigger === '@' ? this.state.suggestions : this.state.tags;
        this.setState({
            suggestions: dataSource.filter(item => item.indexOf(value) !== -1),
        });
    }
    onSelect(){

    }

    render(){
        return (
            <div>
                <Input placeholder="基础使用" />
                <Mention
                    style={{ width: '100%' }}
                    onChange={this.onChange}
                    placeholder="可以自定义"
                    prefix={['@', '#']}
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                    onSelect={this.onSelect}
                />
            </div>
        );
    }
}