import Config from '../../core/constants';
import HttpUtil from '../../core/httputil';
import StorageUtil from "../../core/storageUtil";

class AuthService{
    static signIn(data, cb, errorCb) {
        return HttpUtil.POST(`${process.env.REACT_APP_TOKEN_API || Config.URLS.TOKEN_API}`, data,
            response => cb(response.data), errorCb);
    }

    static clearCredentials() {
        StorageUtil.removeAuth();
    }

    static isAuth = () => !!StorageUtil.getAuth();

    static logOut = () => {
        AuthService.clearCredentials();
    }
}

export default AuthService;
