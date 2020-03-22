// 封装所有首页的网络请求
import {request} from "./request"
// 获取首页的多个数据,这样封装的原因是：不知发送一个请求同时还便于管理
export function getHomeMultidata(){
    return request({
        url:'./home/multidata'
    });
}