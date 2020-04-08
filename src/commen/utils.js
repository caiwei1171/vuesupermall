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