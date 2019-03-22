import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import App from './App'
import Test from './view/test'
import Admin from "./view/admin";
import Login from "./view/login";
import NoPage from "./view/noPage";
import Bottons from "./view/bottons";
import Forms from "./view/forms";
import Home from './view/home'
export default class Router extends Component{
    render(){
        return (
             <HashRouter>
                <App>
                   <Route path='/login' component={Login}></Route>
                   <Route path='/admin' render={() =>
                       <Admin>
                          <Switch>
                              <Route path='/admin/home' component={Home}></Route>
                              <Route path='/admin/ui/button' component={Bottons}></Route>
                              <Route path='/admin/ui/form' component={Forms}></Route>
                              <Route component={NoPage}></Route>
                          </Switch>
                       </Admin>
                   }></Route>
                   <Route path='/test' component={Test}></Route>
                </App>
             </HashRouter>
        )
    }
}