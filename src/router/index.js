import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.安装插件
Vue.use(VueRouter)
// 3.配置映射关系
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: () => import('../views/home/Home')
    },
    {
        path: '/category',
        component: () => import('../views/category/Category')
    },
    {
        path: '/shopcart',
        component: () => import('../views/shopcart/Shopcart')
    },
    {
        path: '/profile',
        component: () => import('../views/profile/Profile')
    },
    {
        path: '/detail/:iid',
        component: () => import('../views/detail/Detail')
    }
]
// 2.创建路由对象
const router = new VueRouter({
    routes,
    mode: 'history'
})
// 3.导出路由
export default router