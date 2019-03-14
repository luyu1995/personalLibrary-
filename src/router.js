import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import LoginUser from './layouts/loginUser/loginUser';
import IndexPage from './view/home/index';
export default class RouterWrap extends Component{
    render(){
        return (
            <div id="router">
                <HashRouter>
                    <Switch>
                        <Route path="/" component={IndexPage}  exact />
                        <Route path="/login" component={LoginUser} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}