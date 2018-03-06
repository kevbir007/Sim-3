import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from './Components/Home/home';
import Dashboard from './Components/Dashboard/dashboard';
import Profile from './Components/Profile/profile';
import Search from './Components/Search/search';

export default (
    <HashRouter>
        <div>
            <Route exact path="/"    component={ Home } />
            <Route path="/dashboard" component={ Dashboard } />
            <Route path="/profile"   component={ Profile } />
            <Route path="/search"    component={ Search } />
        </div>
    </HashRouter>
)