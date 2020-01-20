import React, { Component } from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

//import Home from './components/Home/home';
import { Users, UsersForm } from './components/Users';
import LayoutDefault from "./components/Layouts/LayoutDefault";
import Logout from "./components/Common/Logout";
import Login from "./components/Common/Login";
import LayoutLogin from "./components/Layouts/LayoutLogin";
import Home from "./components/Common/Home";
import ForgotPassword from "./components/Common/ForgotPassword";

class Routes extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <LayoutDefault>
                            <Home />
                        </LayoutDefault>
                    </Route>
                    <Route path="/users/edit/:id">
                        <LayoutDefault>
                            <UsersForm />
                        </LayoutDefault>
                    </Route>
                    <Route path="/users/add">
                        <LayoutDefault>
                            <UsersForm />
                        </LayoutDefault>
                    </Route>
                    <Route path="/users">
                        <LayoutDefault>
                            <Users />
                        </LayoutDefault>
                    </Route>


                    <Route path="/login">
                        <LayoutLogin>
                            <Login/>
                        </LayoutLogin>
                    </Route>
                    <Route path="/logout">
                        <LayoutLogin>
                            <Logout/>
                        </LayoutLogin>
                    </Route>
                    <Route path='/forgot-password'>
                        <LayoutLogin>
                            <ForgotPassword/>
                        </LayoutLogin>
                    </Route>
                    <Route path="*" render={() => <Redirect to="/erro/404" />} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;