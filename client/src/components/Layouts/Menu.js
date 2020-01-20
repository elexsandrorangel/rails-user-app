import { Component } from 'react';

class Menu extends Component {
	constructor(props) {
		super(props);
		this.itens = [
			{
				nome: 'Home',
				title: 'home',
				path: '/',
				ico: 'fas fa-home',
			},
			{
				nome: 'Usuários',
				title: 'users',
				path: '/users',
				ico: 'fas fa-user',
			},
			{
				nome: 'Sair',
				title: 'sair',
				path: '/logout',
				ico: 'fas fa-sign-out-alt',
			},
		];
	}

	get Items() {
		return this.itens;
	}
}

export default Menu;
