import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Main from './component/Main';
import Signup from './component/Signup';
import Login from './component/Login';
import Create from './component/Create';


const Routes = () => (
    <Switch>
        <Route exact path="/" component = {Main}/>
        <Route exact path="/signup" component = {Signup}/>
        <Route exact path="/login" component = {Login}/>
        <Route exact path="/create" component = {Create}/>
    </Switch>
);

export default Routes;