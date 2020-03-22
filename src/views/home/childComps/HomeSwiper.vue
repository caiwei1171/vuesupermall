<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners" v-bind:key="index">
            <a v-bind:href="item.link">
                <img v-bind:src="item.image" alt="">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index"
export default {
    name:"HomeSwiper",
    props:{
        // type:Array,
        // default(){
        //     return []
        // }
        banners:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }    
}
</script>

<style>

</style>