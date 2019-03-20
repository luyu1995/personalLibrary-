import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import App from './App'
export default class Router extends Component{
    render(){
        return (
             <HashRouter>
                <div>
                    <Route path="/" component={App}></Route>
                </div>
             </HashRouter>
        )
    }
}