import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AlertProvider from "../../providers/AlertProvider";

export default class LayoutLogin extends Component {
    render() {
        return (
            <Container fluid className={'container'}>
                <Row noGutters>
                    <Col xs="11" sm="8" md="7" lg="4" className={''}>
                        <Row className={''}>
                            <Col xs={{ size: 6, offset: 3 }}>
                                <img src={'/logo192.png'} alt="Logo" />
                            </Col>
                        </Row>
                        <AlertProvider>
                          {this.props.children}
                        </AlertProvider>
                    </Col>
                </Row>
            </Container>
        );
    }
}