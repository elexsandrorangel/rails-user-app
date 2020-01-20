import React, { Component } from 'react';
import {Redirect, withRouter} from "react-router-dom";
import AuthService from "../../Services/Authentication/AuthService";
import {AlertContext} from "../../providers/AlertProvider";

class Logout  extends Component {

    componentDidMount() {
        if (AuthService.isAuth()) {
            AuthService.logOut();
            this.showSuccessMessage('Logout efetuado com sucesso');
        }
        this.props.history.replace('/');
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
export default withRouter(Logout);