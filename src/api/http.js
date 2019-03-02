import http from './axios'

// get请求
export function getReq(){
    return http.fetchGet('')
}
// post请求
export function postReq(){
    return http.fetchPost('',{})
}
