import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
export default class RouterWrap extends Component{
    render(){
        return (
            <div id="router">
                <HashRouter>
                    <Switch>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}