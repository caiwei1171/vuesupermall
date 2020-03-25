<template>
    <!-- 如果ref绑定在组件中，那么通过this.$refs.refname获取到的是组件对象 -->
    <!-- 如果ref绑定在元素中，那么通过this.$refs.refname获取到的是元素对象 -->
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
// 引入better-scroll插件
import BScroll from "better-scroll"
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        // 1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType
        }),
        // 2.监听滚动的位置
        this.scroll.on("scroll",(position) => {
            this.$emit("scroll",position);
        })
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time);
        }
    }
}
</script>

<style scoped>

</style>