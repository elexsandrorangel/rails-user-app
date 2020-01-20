import axios from 'axios';
import StorageUtil from "./storageUtil";

export default class HttpUtil {
	static buildHeaders() {
		let headers = {};
		let auth =StorageUtil.getAuth();
		if (auth) {
		  	headers['Authorization'] = `${auth.token}`;
		}
		headers['Content-Type'] = 'application/json';

		return headers;
	}
	static buildLoginHeaders(UserCredentials) {
		let headers = {};
		headers['Content-Type'] = 'application/json';
		return headers;
	}

	static handleError = (err, errorCallback) => {
		errorCallback(err);
	};

	// POST
	static POST(url, parameters, callback, errorCallback) {
		let reqHeaders = this.buildHeaders();
		return axios
			.post(url, parameters, {
				headers: reqHeaders,
			})
			.then(callback)
			.catch(err => this.handleError(err, errorCallback));
	}

	static PostGrapApi(url, headers, parameters, callback, errorCallback) {
		let reqHeaders = this.buildHeaders();
		return axios
			.post(url, parameters, {
				headers: headers,
			})
			.then(callback)
			.catch(err => this.handleError(err, errorCallback));
	}
	static Put(url, parameters, callback, errorCallback){
		let reqHeaders = this.buildHeaders();
		return axios.put(url, parameters, {
			headers: reqHeaders
		}).then(callback).catch(err => this.handleError(err, errorCallback));
	}

	static Delete(url, callback, errorCallback){
		let reqHeaders = this.buildHeaders();
		return axios.delete(url, {
			headers: reqHeaders
		}).then(callback).catch(err => this.handleError(err, errorCallback));
	}
	static Login(url, UserCredentials, callback, errorCallback) {
		let basicAuthHeader = this.buildLoginHeaders(UserCredentials);
		delete UserCredentials.strLogin;
		delete UserCredentials.strSenha;
		return axios
			.post(url, { granttype: 'password' }, { headers: basicAuthHeader })
			.then(callback)
			.catch(err => this.handleError(err, errorCallback));
	}

	// GET
	static GET(url, callback, errorCallback) {
		let reqHeaders = this.buildHeaders();
		return axios
			.get(url, {
				headers: reqHeaders,
			})
			.then(callback)
			.catch(err => this.handleError(err, errorCallback));
	}

	static PosUrlFormEncoded(url, params, callback, errorCallback){
		let headers = {};
		headers['Content-Type'] = 'application/x-www-form-urlencoded';
		return axios.post(url, params, { headers: headers})
			.then(callback)
			.catch(err => this.handleError(err, errorCallback));
	}
}
