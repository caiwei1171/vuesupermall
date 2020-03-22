import axios from 'axios'
//最终方案
const request = (config) => {
    //1、创建instance实例
    const instance = axios.create({
        baseURL:'http://123.207.32.32:8000/api/wh',
        timeout:5000
    })
    // 2、axios拦截器
    // 2.1请求拦截作用
    instance.interceptors.request.use(config => {
        return config;
        // 1.比如config中的信息不符合服务器要求
        // 2.比如在发送网络请求时，都希望在界面显示一个请求图标
        // 3.某些网络请求（比如登录token），必须携带一些特殊信息 
    },err => {
        console.log(err)
    })
    // 2.2响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    },err => {
        console.log(err)
    })
    // 3、发送真正的网络请求
    return instance(config)
}
export {request} ;