import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, FormFeedback, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import AuthService from "../../Services/Authentication/AuthService";
import {AlertContext} from "../../providers/AlertProvider";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                strLogin: '',
                email: '',
            },
            invalid: {
                strLogin: false,
                email: false,
            },
        };
    }

    componentDidMount() {
        if (AuthService.isAuth()) {
            this.props.history.replace('/trocar-senha');
        }
    }

    handleInputBlur = ({ target }) => {
        this.setState({
            invalid: {
                ...this.state.invalid,
                [target.name]: (target.required && !this.state.fields[target.name]) || !target.validity.valid,
            },
        });
    };

    handleInputChange = ({ target }) => {
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;

        this.setState({
            fields: { ...this.state.fields, [field]: value },
            invalid: { ...this.state.invalid, [field]: (target.required && !value) || !target.validity.valid },
        });
    };

    isFormValid = () =>
        Object.values(this.state.invalid).every(v => v === false) && Object.values(this.state.fields).every(v => v);

    handleSubmit = e => {
        if (this.isFormValid()) {

        }
    };

    render() {
        return(
            <div>
                <AlertContext.Consumer>
                    {(value) => {
                        this.showInfoMessage = value.info;
                        this.showSuccessMessage = value.success;
                        this.showWarningMessage = value.warning;
                        this.showErrorMessage = value.error;
                    }}
                </AlertContext.Consumer>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="far fa-user" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                id="strLogin"
                                name="strLogin"
                                type="text"
                                placeholder="Usuário"
                                required
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputBlur}
                                invalid={this.state.invalid.strLogin}
                            />
                            <FormFeedback tooltip className="float-right">
                                Digite seu Usuário
                            </FormFeedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="fas fa-at" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                id="strEmail"
                                name="strEmail"
                                type="email"
                                placeholder="Email"
                                required
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputBlur}
                                invalid={this.state.invalid.email}
                            />
                            <FormFeedback tooltip className="float-right">
                                Digite seu e-mail
                            </FormFeedback>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup className="text-right">
                        <Button disabled={!this.isFormValid()} id="btnsalvar" color="primary" type="submit">
						<span>
							<i className="fas fa-undo" /> Soliciar token{' '}
						</span>
                        </Button>{' '}
                        <Button color="secondary" onClick={() => this.props.history.replace('/logout')}>
                            Cancelar
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default withRouter(ForgotPassword);
