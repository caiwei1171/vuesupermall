<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav"></detail-nav-bar>
        <scroll class="content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
            <detail-param-info :paramInfo="paramInfo"></detail-param-info>
            <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
        </scroll>
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
// 封装better-scroll
import Scroll from "@/components/common/scroll/Scroll"
// 获取详情数据
import {getDetail,Goods,Shop,GoodsParam} from "@/network/detail.js"
export default {
    name:"Detail",
    data(){
        return {
            iid:null,
            topImages:[],//顶部图片轮播图数据
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{}
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
        Scroll
    },
    created(){
        // 1.保存传入的id
        // this.iid = this.$route.params.iid;//动态路由的形式
        this.iid = this.$route.query.iid;
        // 根据iid请求详情数据
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
        });
    },
    methods:{
        imageLoad(){
            this.$refs.scroll.refresh();
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