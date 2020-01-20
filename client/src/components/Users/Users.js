import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import SweetAlert from "react-bootstrap-sweetalert/dist";
import 'sweetalert2/dist/sweetalert2.css';
import {
    Card,
    Container,
    Row,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Col
} from 'reactstrap';

import Service from '../../Services/User/UserServices';
import { AlertContext } from "../../providers/AlertProvider";
import Moment from "react-moment";

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listEduc: [],
            pages: 0,
            loading: false,
            invalid: false,
            showConfirmation: false,
            formFilter: {
                email: '',
                name: ''
            }
        }
    }

    handleInputChange(target) {
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const field = target.name;
        this.setState({
            formFilter: { ...this.state.formFilter, [field]: value },
            invalid: { ...this.state.invalid, [field]: target.required && !value },
        });
    }

    handleInputBlur = target => {
        const field = target.name;
        this.setState({
            invalid: { ...this.state.invalid, [field]: target.required && !this.state.formFilter[field] },
        });
    };

    handleFilterSubmit = e => {
        e.preventDefault();
        try {
            Service.search(this.state.formFilter, (data) => {
                if (data) {
                    this.setState({
                        listEduc: data,
                        pages: data.pages,
                        loading: false
                    });
                } else {
                    this.setState({
                        listEduc: data,
                        pages: 0,
                        loading: false
                    });
                }
            }, (err) => {
                this.showErrorMessage(err.message || err.response.data.Error);
            });
        } catch (e) {
            this.showErrorMessage(e.message);
        }
    };

    handleRemoveSubmit = e => {
        try {
            Service.removeData(this.state.recordId, (data) => {
                this.setState({
                    showConfirmation: false
                });
                this.showSuccessMessage("Registro removido com sucesso");
                this.loadData({ page: 0, pageSize: 20 });
            }, (err) => {
                this.showErrorMessage(err.message || err.response.data.Error);
                this.setState({
                    showConfirmation: false
                });
            });
        } catch (e) {
            this.showErrorMessage(e.message);
            this.setState({
                showConfirmation: false
            });
        }
    };

    loadData = (state) => {

        this.setState({ loading: true });
        Service.getData((data) => {
            this.setState({
                listEduc: data,
                pages: data.pages,
                loading: false
            });
        }, (err) => {
            this.showErrorMessage(err.message || err.response.data.Error);
        });
    };

    redirectToForm = e => {
        e.preventDefault();
        this.props.history.push('/users/add');
    };

    render() {
        let rawData = this.state.listEduc;
        const columns = [
            {
                Header: 'Nome',
                accessor: 'name',
                className: 'text-center'
            }, {
                Header: 'E-mail',
                accessor: 'email',
                className: 'text-center'
            },{
                Header: 'Criado em',
                accessor: 'created_at',
                className: 'text-center',
                Cell: (cellProps) => {
                    let value = cellProps.original.created_at;
                    return <Moment format={'DD/MM/YYYY HH:mm'}>{value}</Moment>
                }
            }, {
                Header: 'Modificado em',
                accessor: 'updated_at',
                className: 'text-center',
                Cell: (cellProps) => {
                    let value = cellProps.original.updated_at;
                    return <Moment format={'DD/MM/YYYY HH:mm'}>{value}</Moment>
                }
            }, {
                Header: 'Ações',
                accessor: 'id',
                Cell: (cellProps) => {
                    let id = cellProps.original.id;
                    return <div className={'text-center'}>
                        <Link to={`/users/edit/${id}`} className={'fas fa-edit'} />{' '}

                        <Link to={'#'} className={'fas fa-trash danger'}
                              onClick={() => this.setState({
                                  showConfirmation: true,
                                  recordId: id
                              })} />
                    </div>
                }
            }];

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
                <Container fluid className="h-100">
                    <Row noGutters className="internas">
                        <Col xs={12} sm={5} className={`text-center text-sm-left`}>
                            <h2>
                                <i className="fas fa-users" />Usuários
                            </h2>
                        </Col>
                        <Col xs={12} sm={7} className={''}>
                            <Container>
                                <Row className="justify-content-end">
                                    <Col xs={2} sm={3} md={2} className="order-1">
                                        <Button
                                            outline
                                            color="primary"
                                            block
                                            onClick={this.props.history.goBack}
                                            alt="Voltar"
                                            title="Voltar">
                                            <i className="fas fa-arrow-left" />
                                        </Button>
                                    </Col>
                                    <Col xs={2} sm={3} md={2} className="order-2">
                                        <Button
                                            color="primary"
                                            block
                                            onClick={this.redirectToForm}
                                            alt="Adicionar"
                                            title="Adicionar">
                                            <i className="fas fa-plus" />
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={12} md={12} sm={12}>
                            <Card>
                                <Form onSubmit={this.handleFilterSubmit}>
                                    <Row>
                                        <Col md={6} lg={6} sm={6} xs={12}>
                                            <FormGroup>
                                                <Label for="name">Nome</Label>
                                                <Input
                                                    value={this.state.formFilter.name}
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Nome"
                                                    onChange={({ target }) => this.handleInputChange(target)}
                                                    onBlur={({ target }) => this.handleInputBlur(target)}
                                                    invalid={this.state.invalid.name} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6} lg={6} sm={6} xs={12}>
                                            <FormGroup>
                                                <Label for="email">E-mail</Label>
                                                <Input
                                                    value={this.state.formFilter.email}
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    placeholder="e-mail"
                                                    onChange={({ target }) => this.handleInputChange(target)}
                                                    onBlur={({ target }) => this.handleInputBlur(target)}
                                                    invalid={this.state.invalid.email} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Col>
                                        <FormGroup className="text-right">
                                            <Button id={"btnSave"}
                                                    color="primary" type="submit">
                                                <span>Pesquisar</span>
                                            </Button>
                                        </FormGroup>
                                    </Col>
                                </Form>
                            </Card>
                        </Col>
                        <Col xs={12} sm={12}>
                            <Card>
                                <ReactTable
                                    className="h-100"
                                    data={rawData}
                                    columns={columns}
                                    loading={this.state.loading}
                                    showPagination
                                    showPaginationTop={false}
                                    showPaginationBottom
                                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                                    manual // this would indicate that server side pagination has been enabled
                                    noDataText={"Nenhum registro encontrado"}
                                    minRows={2}
                                    onFetchData={this.loadData}
                                    previousText={"Anterior"}
                                    nextText={"Próxima"}
                                    rowsText={"registros"}
                                    pageText={"Página"}
                                    ofText={"de"}
                                />
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <SweetAlert
                    show={this.state.showConfirmation}
                    title="Confirmação"
                    type='warning'
                    showCancel
                    showCloseButton
                    confirmBtnText='Excluir'
                    cancelBtnText='Cancelar'
                    confirmButtonColor='#d6486b'
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    reverseButtons
                    onConfirm={(e) => this.handleRemoveSubmit(e)}
                    onCancel={() => this.setState({showConfirmation: false})}
                    onEscapeKey={() => this.setState({showConfirmation: false})}>
                    Desejar remover este registro? Esta operação não poderá ser desfeita
                </SweetAlert>
            </main>
        );
    }
}

export default withRouter(Users);