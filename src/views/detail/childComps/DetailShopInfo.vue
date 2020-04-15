<!-- 店铺信息 -->
<template>
    <div class='wraper-shop' v-if="Object.keys(shop).length !== 0">
        <div class="shop-title">
            <img :src="shop.logo" alt="" class="shop-img">
            <span class="shop-name">{{shop.name}} </span>
        </div>
        <div class="shop-info">
            <div class="info-left">
                <div>
                    <div class="count">{{sells}}</div>
                    <div class="sell-text">总销量</div>
                </div>
                <div>
                    <div class="count">{{shop.goodsCount}}</div>
                    <div class="sell-text">全部宝贝</div>
                </div>
            </div>
            <div class="info-right">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td :style="{color:!item.isBetter?'#5ea732':'#f13e3a'}">{{item.score}}</td>
                        <td><span :style="{background:!item.isBetter?'#5ea732':'#f13e3a'}">{{item.isBetter?"高":"低"}}</span></td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="info-link">进店逛逛</div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）

export default {
    name:"DetailShopInfo",
    data(){
        return {};
    },
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }  
        }
    },
    computed:{
        sells(){
            if(this.shop.sells>10000){
                return (this.shop.sells/10000).toFixed(1)+"万"
            }else{
                return this.shop.sells
            }
        },
    },
}
</script>

<style scoped>
    .wraper-shop{
        padding: 25px 8px;
        border-bottom: 5px solid #eee;
    }
    .shop-title{
        height: 45px;
        line-height: 45px;
    }
    .shop-img{
        width: 45px;
        height: 45px;
        border: 1px solid #eee;
        border-radius: 50%;
        vertical-align: middle;
    }
    .shop-name{
        margin-left: 10px;
    }
    .shop-info{
        display: flex;
        margin-top: 10px;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #222;
    }
    .shop-info > div{
        flex: 1;
    }
    .info-left{
        display: flex;
        justify-content: space-around;
        border-right: 1px solid #ccc;
    }
    .info-left > div{
        display: inline-block;
        text-align: center;
    }
    .count{
        font-size: 18px;
        margin-bottom: 10px;
    }
    .info-right > table{
        margin-left: 30px;
    }
    .info-right td{
        padding: 5px 0 ;
    }
    .info-right span{
        color: #fff;
        padding: 0 0;
    }
    .info-link{
        color: #555;
        background: #eee;
        height: 30px;
        width: 150px;
        line-height: 30px;
        text-align: center;
        margin: 0 auto;
        border-radius: 10px;
        font-size: 14px;
        margin-top: 10px;
    }
</style>