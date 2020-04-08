<template>
    <div id="detail">
        <detail-nav-bar></detail-nav-bar>
        <detail-swiper :top-images="topImages"></detail-swiper>
    </div>
</template>

<script>
// 子组件
import DetailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"
// 获取详情数据
import {getDetail} from "@/network/detail.js"
export default {
    name:"Detail",
    data(){
        return {
            iid:null,
            topImages:[],//顶部图片轮播图数据
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper
    },
    created(){
        // 1.保存传入的id
        this.iid = this.$route.params.iid;
        // 根据iid请求详情数据
        getDetail(this.iid).then((res) => {
            // 1.获取顶部图片轮播图数据
            this.topImages = res.result.itemInfo.topImages;
            console.log(this.topImages)
        });
    }
}
</script>

<style>

</style>