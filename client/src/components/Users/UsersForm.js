import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import {Alert, Button, Card, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row} from 'reactstrap';
import Service from "../../Services/User/UserServices";
import {AlertContext} from "../../providers/AlertProvider";

class UsersForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            invalid: false,
            successMsg: '',
            errorMsg: '',
            redirect: false,
            educationLevels:[],
            model: {
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        };
    }

    handleInputChange(target) {
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        this.setState({
            model: {...this.state.model, [field]: value},
            invalid: {...this.state.invalid, [field]: target.required && !value},
        });
    }

    handleInputBlur = target => {
        const field = target.name;
        this.setState({
            invalid: {...this.state.invalid, [field]: target.required && !this.state.model[field]},
        });
    };

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/users' />
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        let isUpdate = this.state.id !== undefined;
        let id = this.state.id;
        let model = this.state.model;

        try {
            if (isUpdate) {
                Service.updateData(id, model, (data) => {
                    this.showSuccessMessage("Usuário atualizado com sucesso");
                    this.setState({
                        redirect: true
                    });
                }, (err) => {
                    this.showErrorMessage(err.message || err.response.data.Error);
                })
            } else {
                Service.saveData(model, (data) => {
                    if (data) {
                        this.showSuccessMessage("Usuário criado com sucesso");
                        this.setState({
                            redirect: true
                        });
                    } else {
                        this.showErrorMessage("Ocorreu um erro durante a operação");
                    }
                }, (err) => {
                    this.showErrorMessage(err.message || err.response.data.Error);
                });
            }
        } catch (e) {
            this.showErrorMessage(e.message || e.response.data.Error);
        }
    };

    componentDidMount() {
        const { match: { params } } = this.props;
        let context = this;

        if (params.id !== undefined) {
            Service.getDetails(params.id, (data) => {
                if (data) {
                    context.setState({
                        id: params.id,
                        model: data
                    });
                }
            }, (err) => {
                this.showErrorMessage(err.message || err.response.data.Error);
            })
        }
    }

    render() {
        let showSuccess = this.state.successMsg.length > 0;
        let showError = this.state.errorMsg.length > 0;
        let context = this;
        return (
            <main className="h-100 animated fadeIn">
                <AlertContext.Consumer>
                    {(value) => {
                        this.showInfoMessage = value.info;
                        this.showSuccessMessage = value.success;
                        this.showWarningMessage = value.warning;
                        this.showErrorMessage = value.error;
                    }}
                </AlertContext.Consumer>

                {this.renderRedirect()}
                <Container className="internas-add">
                    {showSuccess && <Alert color={'success'}>{this.state.successMsg}</Alert>}
                    {showError && <Alert color={'success'}>{this.state.errorMsg}</Alert>}
                    <Col xs={12} sm={5} className={`text-center text-sm-left mb-5`}>
                        <h2>
                            <i className="fas fa-cubes" /> Usu&aacute;rios
                        </h2>
                    </Col>

                    <Col xs={12} md={12} sm={12}>
                        <Card>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col md={6} lg={6} sm={6} xs={12}>
                                        <FormGroup>
                                            <Label for="name">Nome</Label>
                                            <Input
                                                value={this.state.model.name}
                                                id="name"
                                                name="name"
                                                type="text"
                                                required
                                                placeholder="Nome"
                                                maxLength={300}
                                                onChange={({target}) => this.handleInputChange(target)}
                                                onBlur={({target}) => this.handleInputBlur(target)}
                                                invalid={this.state.invalid.name}/>
                                            <FormFeedback tooltip>Digite o nome do usu&aacute;rio</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} lg={6} sm={6} xs={12}>
                                        <FormGroup>
                                            <Label for="name">E-mail</Label>
                                            <Input
                                                value={this.state.model.email}
                                                id="email"
                                                name="email"
                                                type="email"
                                                required
                                                placeholder="user@domain.com"
                                                maxLength={300}
                                                onChange={({target}) => this.handleInputChange(target)}
                                                onBlur={({target}) => this.handleInputBlur(target)}
                                                invalid={this.state.invalid.email}/>
                                            <FormFeedback tooltip>Digite o e-mail do usu&aacute;rio</FormFeedback>
                                        </FormGroup>
                                    </Col>

                                    <Col md={6} lg={6} sm={6} xs={12}>
                                        <FormGroup>
                                            <Label for="name">Senha</Label>
                                            <Input
                                                value={this.state.model.password}
                                                id="password"
                                                name="password"
                                                type="password"
                                                maxLength={300}
                                                onChange={({target}) => this.handleInputChange(target)}
                                                onBlur={({target}) => this.handleInputBlur(target)}
                                                invalid={this.state.invalid.password}/>
                                            <FormFeedback tooltip>Informe a senha do usu&aacute;rio</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} lg={6} sm={6} xs={12}>
                                        <FormGroup>
                                            <Label for="name">Confirma&ccedil;&atilde;o</Label>
                                            <Input
                                                value={this.state.model.password_confirmation}
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                type="password"
                                                maxLength={300}
                                                onChange={({target}) => this.handleInputChange(target)}
                                                onBlur={({target}) => this.handleInputBlur(target)}
                                                invalid={this.state.invalid.password_confirmation}/>
                                            <FormFeedback tooltip>Informe a senha do usu&aacute;rio</FormFeedback>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Col>
                                    <FormGroup className="text-right">
                                        <Button id={"btnSave"}
                                                color="primary" type="submit">
                                            <span>Salvar</span>
                                        </Button>{' '}
                                        <Button color="secondary" onClick={this.setRedirect}>Cancelar</Button>
                                    </FormGroup>
                                </Col>
                            </Form>
                        </Card>
                    </Col>

                </Container>
            </main>
        );
    }
}

export default withRouter(UsersForm);