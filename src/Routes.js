import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Main from './component/Main';
import Signup from './component/Signup';


const Routes = () => (
    <Switch>
        <Route exact path="/" component = {Main}/>
        <Route exact path="/signup" component = {Signup}/>
    </Switch>
);

export default Routes;