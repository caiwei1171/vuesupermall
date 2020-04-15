<template>
    <div class='info-wrapper' v-if="Object.keys(detailInfo).length !== 0">
        <div class="desc">
            <div class="start"></div>
            <div class="content">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-title">穿着效果</div>
        <div>
            <img v-for="(item,index) in detailImg" :key="index" :src="item" class="info-img" @load="imgLoad">
        </div>
    </div>
</template>

<script>
export default {
    name:"DetailGoodsInfo",
    data(){
        return{
            detailImg:[],
            len:0,
            count:0
        }
    },
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    //监控data中的数据变化
    watch:{
        detailInfo(){
            // 获取图片个数
            this.len = this.detailInfo.detailImage[0].list.length
        }
    },
    methods:{
        imgLoad(){
            // 判断，所以图片都加载完了，进行一次回调。避免进行多次回调
            if(++this.count === this.len){
                this.$emit("imageLoad")
            }
        }
    },
    beforeUpdate(){
        this.detailImg = this.detailInfo.detailImage[0].list
    }
}
</script>

<style scoped>
    .info-wrapper{
        padding: 10px 15px;
        border-bottom: 5px solid #eee;
    }
    .desc{
        padding: 15px 0;
    }
    .start::before{
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        background: #222;
        float: left;
    }
    .end::after{
        content: "";
        position: absolute;
        width: 5px;
        height: 5px;
        background: #222;
        right: 0;
        bottom: 0;
    }
    .start, .end{
        width: 90px;
        height: 1px;
        background: #222;
        position: relative;
    }
    .end{
        float: right;
    }
    .content{
        font-size: 14px;
        padding: 15px;
    }
    .info-title{
        color: #222;
        font-size: 15px;
        padding: 10px 15px ;
    }
    .info-img{
        width: 100%;
    }
</style>