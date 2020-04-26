<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
        <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
            <goods-list :goods="recommends" ref="recommend"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTo"></back-top>
    </div>
</template>

<script>
// 子组件
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShopInfo from "./childComps/DetailShopInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"
// 封装better-scroll
import Scroll from "@/components/common/scroll/Scroll"
import GoodsList from "@/components/content/goods/GoodsList"

// 获取详情数据
import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "@/network/detail.js"
import {debounce} from '@/commen/utils.js'
import {itemListenerMixin,backTopMixin} from '@/commen/mixin.js'
// 调用vuex中的方法
import {mapActions} from 'vuex'
export default {
    name:"Detail",
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return {
            iid:null,
            topImages:[],//顶部图片轮播图数据
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopy:null,
            currentIndex:0
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList,
        Scroll
    },
    created(){
        // 1.保存传入的id
        // this.iid = this.$route.params.iid;//动态路由的形式
        this.iid = this.$route.query.iid;
        // 2.根据iid请求详情数据
        getDetail(this.iid).then((res) => {
            // 1.获取顶部图片轮播图数据
            const data = res.result;
            this.topImages = data.itemInfo.topImages;
            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
            // 3.创建店铺信息对象
            this.shop = new Shop(data.shopInfo);
            // 4.创建商品详情数据
            this.detailInfo = data.detailInfo;
            // 5.获取商品的参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
            // 6.取出评论信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
            }
            // this.$nextTick(() => {//等前面元素渲染完成后在执行里面的回调函数
                // 此时，dom元素已被渲染但图片依然是没加载完
                // this.themeTopYs = [];
                // this.themeTopYs.push(0);
                // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            // })
        });
        // 3.请求推荐数据
        getRecommend().then((res) => {
            this.recommends = res.data.list;
        }),
        // 4.给getThemeTopy赋值
        this.getThemeTopy = debounce(() => {
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.params.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE);
        },100)
    },
    mounted(){
        // const refresh = debounce(this.$refs.scroll.refresh,50);
        // this.itemImgListener = () => {
        //     this.$refs.scroll.refresh();
        //     refresh()
        // }
        // this.$bus.$on('detailImageLoad',this.itemImgListener);
    },
    updated(){
        // this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 45);
        // this.themeTopYs.push(Number.MAX_VALUE);
    },
    destroyed(){
        this.$bus.$off('detailImageLoad',this.itemImgListener);
    },
    methods:{
        ...mapActions(['addCart']),
        imageLoad(){
            this.$refs.scroll.refresh();
            this.getThemeTopy();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
        },
        // 实现移动图片顶部导航也变化
        contentScroll(position){
            // 1.获取y值
            const positionY = -position.y;
            // 2.positionY和getThemeTopy值进行对比
            let length = this.themeTopYs.length;
            for(let i = 0;i < length - 1;i++){
                if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
                    this.currentIndex = i;
                    this.$refs.nav.currentIndex = this.currentIndex;
                }
            }
            // 3.是否现实回到顶部
            this.listenShowBackTop(position);
        },
        addToCart(){
            // 1.获取购物车需要展示的商品信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.newPrice = this.goods.realPrice;
            product.iid = this.iid;
            // 2.将商品添加到购物车
            // this.$store.dispatch("addCart",product);
            this.addCart(product).then(res => {
                this.$toast.show(res);
            })
            // this.$store.dispatch("addCart",product).then(res => {
            //     console.log(res)
            // })
        }
    }
}
</script>

<style scoped>
    #detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
        top: 0;
        right: 0;
        left: 0;
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .content{
        height: calc(100% - 44px);
    }
</style>