import React, {Component} from 'react';
import {Container, Col} from 'reactstrap';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Header from './Header';
import AlertProvider from "../../providers/AlertProvider";

class LayoutDefault extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    onCollapse = () => {
        let active = !this.state.collapsed;
        this.setState({collapsed: active});
    };

    render() {
        return (
            <Container fluid>
                <Col sm="12" className="d-xs-block d-sm-block d-md-block d-lg-none">
                    <Header/>
                </Col> 
                <Col                    
                    id="sidebar"
                    className={
                        this.state.collapsed
                            ? 'collapsed d-xs-none d-sm-none d-md-none d-lg-block'
                            : 'd-xs-none d-sm-none d-md-none d-lg-block'
                    }>
                    <Sidebar
                        action={this.onCollapse}
                        blUsuarioAcessos={this.props.params && parseInt(this.props.params.idUsuario) > 0}
                    />
                </Col>
                <Col id="main" className={this.state.collapsed ? 'collapsed h-100' : 'h-100'}>
                    <AlertProvider>
                        {this.props.children}
                    </AlertProvider>
                    <Footer/>
                </Col>
                {/* </Row> */}
            </Container>
        );
    }
}

export default LayoutDefault;
