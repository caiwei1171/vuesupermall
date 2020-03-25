<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">
                购物街
            </div>
        </nav-bar>
        <scroll class="content" ref="scroll" v-bind:probe-type="3" @scroll="centerScroll">
            <home-swiper v-bind:banners="banners"></home-swiper>
            <recommend-view v-bind:recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control class="tab-control" :titles="titles" @tabClick="tabClick"></tab-control>
            <goods-list :goods="showGoods"></goods-list>
        </scroll>
        <!-- native可以监听某个组件发生的事件 -->
        <!-- 注意：当我们需监听一个组件，必须给组件添加.native修饰符才能进行监听 -->
        <back-top @click.native="backClick" v-show="isShowBackTo"></back-top>
    </div>
</template>

<script>

// home组件
// 轮播图
import HomeSwiper from "./childComps/HomeSwiper"
// 推荐
import RecommendView from "./childComps/RecommendView"
// 图片
import FeatureView from "./childComps/FeatureView"

// 公共组件
// 头部
import NavBar from "@/components/common/navbar/NavBar"
// tab切换栏目
import TabControl from "@/components/content/tabControl/TabControl"
// 请求商品
import GoodsList from "@/components/content/goods/GoodsList"
// 封装better-scroll
import Scroll from "@/components/common/scroll/Scroll"
// BackTop的封装
import BackTop from "@/components/content/backTop/BackTop"

// 发送网络请求
import {getHomeMultidata,getHomeGoods} from "@/network/home.js"

export default {
    name: "Home",
    components:{
        // home组件注册
        HomeSwiper,
        RecommendView,
        FeatureView,
        // 公共组件注册
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners:[],
            recommends:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:"pop",
            titles:["流行","新款","精选"],
            isShowBackTo:false,//控制backTo的现实与隐藏
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list;
        }
    },
    created(){//created函数中最好是只写调用方法，执行的函数放到methods中去
        // 请求多个数据
        this.getHomeMultidata();
        // 请求商品数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
    },
    methods:{
        // 事件监听相关方法
        tabClick(index){
            switch(index){
                case 0:this.currentType = "pop";
                break;
                case 1:this.currentType = "new";
                break;
                case 2:this.currentType = "sell";
                break;
            }
        },
        backClick(){
            // scrollTo(x距离，y距离，时间以ms为单位)
            this.$refs.scroll.scrollTo(0,0,500);
        },
        centerScroll(position){
            // 通过记录判断是否显示与隐藏
            this.isShowBackTo = (-position.y) > 1000
        },

        // 网络请求相关方法
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type,page).then(res => {
                this.goods[type].list.push(...res.data.list);
                this.goods[type].page += 1;
            })
        }
    }
}
</script>

<style scoped>
    #home{
        position: relative;
        height: 100vh;
        /* vh指视口： 100vh值100%视口 */
        box-sizing: border-box;
        overflow: hidden;
        padding-top: 44px;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        z-index: 9;
    }
    .tab-control{
        top: 44px;
        z-index: 9;
    }
    .content{
        overflow: hidden;
        position: absolute;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 49px; 
    }
    /*.tabControle1{
        position: relative;
        background: #fff;
        z-index: 999;
    } */
</style>