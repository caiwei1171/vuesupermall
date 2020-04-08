<template>
    <swiper>
        <swiper-item v-for="(item,index) in banners" v-bind:key="index">
            <a v-bind:href="item.link">
                <img v-bind:src="item.image" alt="" @load="imageLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index"
export default {
    name:"HomeSwiper",
    props:{
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
    },
    data(){
        return {
            isLoad:false
        }
    },
    methods:{
        imageLoad(){
            if(!this.isLoad){
                this.$emit("swiperImageLoad");
                this.isLoad = true;
            }    
        }
    }  
}
</script>

<style>

</style>