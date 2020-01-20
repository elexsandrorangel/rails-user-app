import Config from '../../core/constants';
import HttpUtil from '../../core/httputil';

class BaseServices{
    constructor(endpoint){
        this.endpoint = endpoint;
        this.apiUrl = process.env.REACT_APP_API_URL || Config.URLS.API_URL;
        this.services = {
            getData: (cb, errorCb) => {
                
                return HttpUtil.GET(`${this.apiUrl}${this.endpoint}`,
                        response => cb(response.data),
                    errorCb);

            },
            updateData: (id, data, cb, errorCb) => {
                return HttpUtil.Put(`${this.apiUrl}${this.endpoint}/${id}`, data, cb, errorCb);
            },
            removeData: (id, cb, errorCb) => {
                return HttpUtil.Delete(`${this.apiUrl}${this.endpoint}/${id}`, cb, errorCb);
            },
            saveData: (data, cb, errorCb) => {
                
                return HttpUtil.POST(`${this.apiUrl}${this.endpoint}`, data,
                        response => cb(response.data), errorCb);
            },
            getDetails: (id, cb, errorCb) => {
                return HttpUtil.GET(`${this.apiUrl}${this.endpoint}/${id}`,
                        response => cb(response.data), errorCb);
            },
            search: (data, cb, errorCb) => {
                if (data.hasOwnProperty('active')){
                    if (typeof data.active !== "boolean"){
                        data.active = data.active === 'true';
                    }
                }
                if (data.hasOwnProperty('removed')){
                    if (typeof data.removed !== "boolean"){
                        data.removed = data.removed === 'true';
                    }
                }else {
                    data.removed = false;
                }

                return HttpUtil.POST(`${this.apiUrl}${this.endpoint}/search`, data,
                        response => cb(response.data), errorCb);
            }
        };
    }
}

export default BaseServices;
