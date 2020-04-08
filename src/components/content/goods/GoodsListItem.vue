<template>
    <div class="goods-list-item" @click="itemClick">
        <!-- 原生js监听图片 img.onLoad = function(){} -->
        <!-- Vue中监听：@load="方法" -->
        <img :src="goodsItem.show.img" alt="" @load="imageLoad">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"GoodsListItem",
    props:{
        goodsItem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imageLoad(){
            // if(this.$route.path.includes('/home')){
                this.$bus.$emit('homeImageLoad');
            // }else if(this.$route.path.includes('/detail')){
            //     this.$bus.$emit('detailImageLoad')
            // }else{
            //     this.$bus.$emit('categoryImageLoad');
            // }
        },
        // 获取商品详情页
        itemClick(){
            this.$router.push('/detail/' + this.goodsItem.iid)
        }
    }
}
</script>

<style scoped>
    .goods-list-item{
        width: 48%;
        padding-bottom: 40px;
        position: relative;
    }
    .goods-list-item img{
        width: 100%;
        border-radius: 5px;
    }
    .goods-info{
        text-align: center;
        font-size: 12px;
        position:absolute;
        left: 0;
        bottom: 5px;
        right: 0;
        overflow: hidden;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .collect {
        position: relative;
    }
    .goods-info .collect::before{
        content: '';
        position: absolute;
        left: -15px;
        top: -1px;
        width: 14px;
        height: 14px;
        background: url("../../../assets/images/common/collect.svg") 0 0/14px 14px;
    }
</style>