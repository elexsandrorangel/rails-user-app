import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import AuthService from "../../Services/Authentication/AuthService";
import {AlertContext} from "../../providers/AlertProvider";

class Home extends Component{
    componentDidMount() {
        if (AuthService.isAuth()) {
            this.props.history.replace('/users');
        } else {
            this.props.history.replace('/login');
        }
    }

    render = () => (
        <AlertContext.Consumer>
            {(value) => {
                this.showInfoMessage = value.info;
                this.showSuccessMessage = value.success;
                this.showWarningMessage = value.warning;
                this.showErrorMessage = value.error;
            }}
        </AlertContext.Consumer>
    );
}

export default withRouter(Home);