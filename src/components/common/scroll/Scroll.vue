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
        },
        pullUpLoad:{
            type:Boolean,
            default:false
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
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        }),
        // 2.监听滚动的位置
        this.scroll.on("scroll",(position) => {
            this.$emit("scroll",position);
        })
        // 监听scroll是否滚动到顶部事件
        this.scroll.on("pullingUp",() => {
            this.$emit('pullingUp');
        })
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time);
        },
        finishPullUp(){
            //提示本次加载完成(pullUpLoad)
            this.scroll && this.scroll.finishPullUp()  
        },
        refresh(){
            this.scroll && this.scroll.refresh()
        },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0;
        }
    }
}
</script>

<style scoped>

</style>