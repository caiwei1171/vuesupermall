//提高效率之防抖功能
//本质：等待delay秒后执行，如果delay秒后再次执行，则取消上一个执行函数
export function debounce(fn,delay) {  
    let timer = null;
    return function (...args) { 
        if(timer !== null) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this,args)
        },delay)
    }
}
//时间格式
export function formatDate(date,fmt){
    if(/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for(let k in o){
        if(new RegExp(`(${k})`).test(fmt)){
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero(str){
    return ('00' + str).substr(str.length);
}
/* 
    时间使用方式-》过滤器
    filters:{
        showDate(value){
          let date = new Date(value*1000)
          return formatDate(date,"yyyy-MM-dd")
        }
    }
*/