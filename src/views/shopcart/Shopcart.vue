<template>
    <div class="cart">
        <!-- 头部导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{length}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
// 公共组件
import NavBar from "@/components/common/navbar/NavBar"
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"
import {mapGetters} from "vuex"
export default {
    name: "Shopcart",
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        // 第一种写法
        // ...mapGetters(['cartCount','cartList'])
        // 第二种写法
        ...mapGetters({
            length:"cartCount"
        })
    }
}
</script>

<style scoped>
    .cart{
        height: 100vh;
    }
    .nav-bar{
        background-color: var(--color-tint);
        color: #fff;
    }
</style>