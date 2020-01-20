import React, { Component } from 'react';
import { Nav, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../assets/css/sidebar.css';
import { PropTypes } from 'prop-types';
import Menu from './Menu';

class Sidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setarMenu: window.location.pathname.split('/')[1],
		};

		this.menuItens = new Menu();
		this.menuItens = this.menuItens.Items;
	}

	setMenu = event => {
		this.setState({ setarMenu: event.target.title });
	};

	render() {
		Nav.propTypes = {
			tabs: PropTypes.bool,
			pills: PropTypes.bool,
			card: PropTypes.bool,
			justified: PropTypes.bool,
			fill: PropTypes.bool,
			vertical: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
			horizontal: PropTypes.string,
			navbar: PropTypes.bool,
			tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
			// pass in custom element to use
		};

		NavLink.propTypes = {
			disabled: PropTypes.bool,
			active: PropTypes.bool,
			// pass in custom element to use
			//tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
			// ref will only get you a reference to the NavLink component, use innerRef to get a reference to the DOM element (for things like focus management).
			innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
		};

		return (
			<aside className="animated">
				<div className="header">
					<div className="row">
						<a href="/" className="col align-self-center">
							<img src="/logo192.png" width="126" alt="Logo" />
						</a>
						{/* <div className="flex-row-reverse menu-collapse">
							<a href="#" className="menu float-right" onClick={this.props.action}>
								<i className="fas fa-sign-in-alt" />
							</a>
						</div> */}
					</div>
				</div>

				<Nav vertical={true}>
					{this.menuItens.map(item => (
						<NavItem key={item.title}>
							<NavLink
								tag={Link}
								to={item.path}
								title={item.title}
								onClick={this.setMenu}
								className={
									!this.props.blUsuarioAcessos && this.state.setarMenu === item.title ? 'active' : ''
								}>
								<i className={item.ico} />
								<span>{item.nome}</span>
							</NavLink>
							{this.props.blUsuarioAcessos &&
								item.title === 'usuarios' && (
									<NavLink className="active subitem" title="Acessos">
										<i className="fas fa-sliders-h" />
										<span>Configurações</span>
									</NavLink>
								)}
						</NavItem>
					))}
				</Nav>
			</aside>
		);
	}
}

export default Sidebar;
