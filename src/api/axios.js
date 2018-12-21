import axios from 'axios';
var qs = require('qs');

// axios的请求时间

export default function httpRequest(api, method, params) {
    // 显示 loading
    // store.dispatch('FETCH_LOADING', true);
    // let axiosDate = new Date();

    method = method ? method : 'GET';
    method = method.toUpperCase();// 转大写
    if (method == 'GET') {
        api = api + "?" + qs.stringify(params);
    }
    //"Authorization":" ",
    //'Content-type': 'application/json; charset=UTF-8',
    // 'Content-type': 'application/x-www-form-urlencoded;multipart/form-data; charset=UTF-8' // qs.stringify(params)
    //alert(JSON.stringify(params));

    let header = {'Content-Type': 'application/x-www-form-urlencoded;multipart/form-data; charset=UTF-8'};
    //if(window.localStorage.getItem("user_token")){
    //    header.token = window.localStorage.getItem("user_token");
    //}
    return axios({
        method: method,
        url: api,
        data: qs.stringify(params),
        headers: header
    }).then((response) => {
        //alert(JSON.stringify(response.data));
        // 关闭  loading图片消失
        // let oDate = new Date();
        // let time = oDate.getTime() - axiosDate.getTime();
        // time = (time < 500) ? 500 : 0;
        // setTimeout(() => {
        //     store.dispatch('FETCH_LOADING', false);
        // }, time);
        console.log("response.data=========================start");
        console.log(response.data);
        console.log("response.data=========================end");

        // token 失效
        //if(response.data.code == 401){
        //    window.localStorage.removeItem("user_token");
        //    window.localStorage.removeItem("user_info");
        //    window.location.reload();
        //    return;
        //}

        //Raven.captureException(response.data, {
        //    level: 'info', // one of 'info', 'warning', or 'error'
        //    logger: api + '======ajax_function======params======' + params
        //});

        return response.data;
    }).catch((error) => {
        // 关闭  loading图片消失
        // store.dispatch('FETCH_LOADING', false);
        // axiosDate = new Date();
        console.log(error);

        //Raven.captureException(error, {
        //    level: 'error', // one of 'info', 'warning', or 'error'
        //    logger: api + '======ajax_function======params======' + params
        //});
    });
}

export function httpJSONRequest(api, method, params) {
    method = method ? method : 'GET';
    method = method.toUpperCase();// 转大写
    //"Authorization":" ",
    //'Content-type': 'application/json; charset=UTF-8',
    // 'Content-type': 'application/x-www-form-urlencoded;multipart/form-data' // qs.stringify(params)

    let header = {'Content-Type': 'application/json; charset=UTF-8'};
    //if(window.localStorage.getItem("user_token")){
    //    header.token = window.localStorage.getItem("user_token");
    //}
    return axios({
        method: method,
        url: api,
        data: params,
        headers: header
    }).then((response) => {
        console.log("response.data=========================start");
        console.log(response.data);
        console.log("response.data=========================end");

        //Raven.captureException(response.data, {
        //    level: 'info', // one of 'info', 'warning', or 'error'
        //    logger: api + '======ajax_function======params======' + params
        //});

        // token 失效
        //if(response.data.code == 401){
        //    window.localStorage.removeItem("user_token");
        //    window.localStorage.removeItem("user_info");
        //    // window.location.reload();
        //    return;
        //}

        return response.data;
    }).catch((error) => {
        console.log(error);

        //Raven.captureException(error, {
        //    level: 'error', // one of 'info', 'warning', or 'error'
        //    logger: api + '======ajax_function======params======' + params
        //});
    });
}

export function uploadFileRequest(api, method, params) {
    method = method ? method : 'GET';
    method = method.toUpperCase();// 转大写
    //"Authorization":" ",
    //'Content-type': 'application/json; charset=UTF-8',
    // 'Content-type': 'application/x-www-form-urlencoded;multipart/form-data' // qs.stringify(params)
    return axios({
        method: method,
        url: api,
        data: params,
        headers: {
            'Content-Type': 'multipart/form-data;'
        }
    }).then((response) => {
        console.log("response.data=========================start");
        console.log(response.data);
        console.log("response.data=========================end");

        //Raven.captureException(response.data, {
        //    level: 'info', // one of 'info', 'warning', or 'error'
        //    logger: api + '======ajax_function======params======' + params
        //});

        return response.data;
    }).catch((error) => {
        console.log(error);

        //Raven.captureException(error, {
        //    level: 'error', // one of 'info', 'warning', or 'error'
        //    logger: api + '======ajax_function======params======' + params
        //});
    });
}
