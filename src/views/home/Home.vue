<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">
                购物街
            </div>
        </nav-bar>
        <home-swiper v-bind:banners="banners"></home-swiper>
        <recommend-view v-bind:recommends="recommends"></recommend-view>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import {getHomeMultidata} from "@/network/home.js"

export default {
    name: "Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView
    },
    data(){
        return {
            banners:[],
            recommends:[]
        }
    },
    created(){
        // 请求多个数据
        getHomeMultidata().then(res => {
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
        })
    }
}
</script>

<style scoped>
    #home{
        position: relative;
        height: 100vh;
        box-sizing: border-box;
        overflow: hidden;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 49px;
    }
    .tabControle1{
        position: relative;
        background: #fff;
        z-index: 999;
    }
</style>