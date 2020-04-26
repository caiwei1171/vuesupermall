<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">
                购物街
            </div>
        </nav-bar>
        <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
        <scroll class="content" ref="scroll" v-bind:probe-type="3" @scroll="centerScroll" :pull-up-load="true" @pullingUp="loadmore">
            <home-swiper v-bind:banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view v-bind:recommends="recommends"></recommend-view>
            <feature-view></feature-view>
            <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"></tab-control>
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

// 发送网络请求
import {getHomeMultidata,getHomeGoods} from "@/network/home.js"

// 工具类
import {debounce} from "@/commen/utils.js"
import {backTopMixin} from '@/commen/mixin.js'

export default {
    name: "Home",
    mixins:[backTopMixin],
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
            tabOffsetTop:0,
            isTabFixed:false,//默认情况不需要吸顶
            saveY:0
        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list;
        }
    },
    activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0);
        this.$refs.scroll.refresh();
    },
    deactivated(){
        this.saveY = this.$refs.scroll.getScrollY();
    },
    created(){//created函数中最好是只写调用方法，执行的函数放到methods中去
        // 请求多个数据
        this.getHomeMultidata();
        // 请求商品数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
    },
    mounted(){
        // 监听item中图片加载完成
        // const refresh = debounce(this.$refs.scroll.refresh,50)
        const refresh = debounce(this.$refs.scroll.refresh,300)
        this.$bus.$on('homeImageLoad',() => {
            refresh();
        });
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
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        centerScroll(position){
            // 通过记录判断BackTop是否显示与隐藏
            this.listenShowBackTop(position);
            // 决定tabControl是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffsetTop;
        },
        // 上拉加载更多事件
        loadmore(){
            this.getHomeGoods(this.currentType);
        },
        swiperImageLoad(){
            // 获取tabControl的offsetTop属性
            // 所有的组件都有$el：用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
                // 完成上拉加载更多
                this.$refs.scroll.finishPullUp();
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
    .tab-control{
        position: relative;
        background: #fff;
        z-index: 999;
    }
</style>