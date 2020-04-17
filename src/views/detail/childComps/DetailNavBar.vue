<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="@/assets/images/common/back.svg" alt=""/>
        </div>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" 
                :key="index" class="title-item" 
                :class="{active:index === currentIndex}"
                @click="titleClick(index)">
                {{item}}
            </div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
    name:"DetailNavBar",
    components:{
        NavBar
    },
    data(){
        return {
            titles:["商品","参数","评论","推荐"],
            currentIndex:0
        }
    },
    methods:{
        // 导航栏点击变色
        titleClick(index){
            this.currentIndex = index;
            this.$emit("titleClick",index)
        },
        // 返回
        backClick(){
            this.$router.go(-1);
        }
    }
}
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 13px;
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 10px;
    }
</style>