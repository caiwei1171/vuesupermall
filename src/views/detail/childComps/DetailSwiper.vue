<template>
    <div class="detail-swiper">
        <swiper class="swiper-item">
            <swiper-item v-for="(item,index) in topImages" :key="index">
                <img :src="item" alt=""/>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
// 轮播图组件
import {Swiper,SwiperItem} from "@/components/common/swiper/index"
export default {
    name:"DetailSwiper",
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style scoped>
    .swiper-item{
        height: 300px;
        overflow: hidden;
    }
</style>