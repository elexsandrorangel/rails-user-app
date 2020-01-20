import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {Link} from "react-router-dom";
import Menu from './Menu';

class Header extends Component {
	constructor(props) {
		super(props);
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true
		};
		this.menuItens = new Menu();
		this.menuItens = this.menuItens.Items;
	};

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	render(){
		return(
			<header>
				<Navbar color="faded" light>
					<NavbarBrand href="/" className="mr-auto">
						<img src="./img/logo.svg" alt="User App"/>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
					<Collapse isOpen={!this.state.collapsed} navbar>
						<Nav navbar>
							{
								this.menuItens.map((item) => {
									return(
										<NavItem key={item.nome}>
											<NavLink tag={Link} to={item.path}>
												<i className={item.ico}></i>
												<span>{item.nome}</span>
											</NavLink>
										</NavItem>
									)
								})
							}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		)
	}
}

export default Header;