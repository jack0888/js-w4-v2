import httpRequest,{httpJSONRequest } from './axios'
import js_api from './config'

export function getDate(params) {
    return httpJSONRequest(js_api.test, 'post', params);
}

export function postDate(params) {
    return httpRequest(nt_api.test, 'post', params);
}

