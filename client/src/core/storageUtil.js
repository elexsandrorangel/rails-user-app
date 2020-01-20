import { STORAGE_KEYS } from './constants'

export default class StorageUtil {
	static saveAuth(authData, blLocalStorage) {
		blLocalStorage = blLocalStorage || typeof localStorage.getItem(STORAGE_KEYS.JWT_KEY) === 'string';
		if (blLocalStorage) {
			localStorage.setItem(STORAGE_KEYS.JWT_KEY, JSON.stringify(authData));
		} else {
			sessionStorage.setItem(STORAGE_KEYS.JWT_KEY, JSON.stringify(authData));
			localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
			localStorage.removeItem('sessionStorage');
		}
	}

	static getAuth = () =>
		JSON.parse(localStorage.getItem(STORAGE_KEYS.JWT_KEY) || sessionStorage.getItem(STORAGE_KEYS.JWT_KEY));

	static pwdSet = () => {
		localStorage.setItem('pwdSet', 'true'); //broadcast para outras abas abertas
		localStorage.removeItem('pwdSet');
	};

	static lockApiResource = () => localStorage.setItem('lockApiResource', 'true');

	static removeAuth() {
		sessionStorage.removeItem('login');
		localStorage.setItem('logout', 'true'); //broadcast para outras abas abertas
		localStorage.removeItem('logout');
		localStorage.removeItem(STORAGE_KEYS.JWT_KEY);
		sessionStorage.removeItem(STORAGE_KEYS.JWT_KEY);
	}
}
