<template>
    <div class="goods-list-item" @click="itemClick">
        <!-- 原生js监听图片 img.onLoad = function(){} -->
        <!-- Vue中监听：@load="方法" -->
        <img :src="showImage" alt="" @load="imageLoad">
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
    computed:{
        showImage(){
            return this.goodsItem.image || this.goodsItem.show.img;
        }
    },
    methods:{
        imageLoad(){
            if(this.$route.path.includes('/home')){
                this.$bus.$emit('homeImageLoad');
            }else if(this.$route.path.includes('/detail')){
                this.$bus.$emit('detailImageLoad')
            }else{
                this.$bus.$emit('categoryImageLoad');
            }
        },
        // 获取商品详情页
        itemClick(){
            // 动态路由的形式
            // this.$router.push('/detail/' + this.goodsItem.iid);
            // 通过query的形式传递参数  注意：通过此方式需将路由中的地址:iid去掉
            this.$router.push({
                path:"/detail",
                query:{
                    iid:this.goodsItem.iid
                }
            });
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