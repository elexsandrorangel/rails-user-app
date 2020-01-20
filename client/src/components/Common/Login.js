import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import AuthService from "../../Services/Authentication/AuthService";

import {
    Button,
    Form,
    FormGroup,
    FormFeedback,
    Label,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
} from 'reactstrap';
import {AlertContext} from "../../providers/AlertProvider";
import StorageUtil from "../../core/storageUtil";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            redirect_uri: '',
            wasAlreadyAuth: false,
            touched: {
                username: false,
                password: false,
            },
        };
    }

    handleLoginError = err => {
         AuthService.clearCredentials();
         let errorMessage;
         if (err.message === 'Network Error'){
             errorMessage = 'Não foi possível acessar o servidor';
         }
         else if (err.response && (err.response.status === 400 || err.response.status === 401)) {
             errorMessage = 'Usuário não autenticado';
         }
         else if (err.message) {
             errorMessage = err.message;
         }
         else {
             errorMessage = 'Ocorreu um erro inesperado durante o login';
         }

         this.showErrorMessage(errorMessage);
    };

    handleUserLogin = event => {
        AuthService.signIn(
            {
                email: this.state.username,
                password: this.state.password,
            },
            data => {
                console.log(data);
                if (data && data.token){
                    StorageUtil.saveAuth(data, true);
                    this.props.history.push('/users');
                }
            },
            this.handleLoginError,
        );
        event.preventDefault();
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    };
    handleInputBlur = field => this.setState({ touched: { ...this.state.touched, [field]: true } });
    isLoginDisabled = () => !this.state.username || !this.state.password;
    isEmptyUsername = () => this.state.touched.username && !this.state.username;
    isEmptyPassword = () => this.state.touched.password && !this.state.password;

    render() {
        return (
            <div>
                <AlertContext.Consumer>
                    {(value) => {
                        this.showInfoMessage = value.info;
                        this.showSuccessMessage = value.success;
                        this.showWarningMessage = value.warning;
                        this.showErrorMessage = value.error;
                    }}
                </AlertContext.Consumer>
                <Form onSubmit={this.handleUserLogin}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="far fa-user" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Usuário"
                                onChange={this.handleInputChange}
                                onBlur={() => this.handleInputBlur('username')}
                                invalid={this.isEmptyUsername()}
                            />
                            <FormFeedback tooltip>Digite seu Usuário!</FormFeedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fas fa-lock" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Senha"
                                onChange={this.handleInputChange}
                                onBlur={() => this.handleInputBlur('password')}
                                invalid={this.isEmptyPassword()}
                            />
                            <FormFeedback tooltip>Digite sua Senha!</FormFeedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <a className={'primary'} href="/esqueci-minha-senha">
                            Esqueci minha senha
                        </a>
                        <Button
                            id="btnentrar"
                            color="primary"
                            type="primary"
                            disabled={this.isLoginDisabled()}>
                            <i className="fas fa-lock" /> Entrar
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default withRouter(Login);