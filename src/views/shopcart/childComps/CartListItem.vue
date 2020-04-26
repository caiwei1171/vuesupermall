<template>
    <div class="shop-item">
		<div class="item-selector">
			<check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
		</div>
		<div class="item-img">
			<img :src="showImage" alt="">
		</div>
		<div class="item-info">
			<div class="item-title">{{product.title}}</div>
			<div class="item-desc">商品描述：{{product.desc}}</div>
			<div class="info-bottom">
				<div class="item-price left">￥{{product.newPrice}}</div>
				<div class="item-count right">x{{product.count}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton"
export default {
    name:"CartListItem",
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    components:{
        CheckButton
    },
    methods:{
			checkClick(){
				this.product.checked = !this.product.checked;
			}
		},
		computed:{
			showImage(){
				return 'http:' + this.product.image;
			}
		}
}
</script>

<style scoped>
.shop-item{
		width:100%;
		display: flex;
		font-size: 0;
		padding: 5px;
		border-bottom: 1px solid #ccc;
	}
	.item-selector{
		width:14%;
		display: flex;
		justify-content:center;
		align-items: center;
	}
	.item-title,.item-desc{
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.item-img{
		padding: 5px;
	}
	.item-img img{
		width: 80px;
		height: 100px;
		display: block;
		border-radius: 5px;
	}
	.item-info{
		font-size: 17px;
		color: #333;
		padding:5px 10px;
		position: relative;
		overflow: hidden;
	}
	.item-info .item-desc{
		font-size: 14px;
		color: #666;
		margin-top: 15px;
	}
	.info-bottom{
		margin-top: 10px;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
	}
	.info-bottom .item-price{
		color: orangered;
	}
    /* .goods-container{
        padding: 5px;
        border-bottom: 1px solid rgb(153, 152, 152 ,0.5);
        display: flex;
    }
    .goods-left{
        padding: 5px;
    }
    .goods-left > img{
        width: 80px;
        height: 100px;
        border-radius: 5px;
        background-color: red;
    }
    .goods-right{
        padding: 5px 10px ;
        overflow: hidden;
        white-space: nowrap; 
    }
    .title, .desc{
        overflow: hidden;
        text-overflow: ellipsis; 
    }
    .title{
        color: #333;
        font-size: 17px;
    }
    .desc{
        margin-top: 15px;
        font-size: 14px;
    color: #666; 
    }
    .goods-right div:last-child{
        margin-top:15px; 
        display: flex;
        justify-content: space-between;
        line-height: 29px;
    }
    .price{
        color: #ff4500;
    }
    .check-button{
        vertical-align: middle;
        border-radius: 50%;
        position: relative;
        top: 50%;
        margin-top: -20px;
        border: 2px solid #ff8198;
    }
    .check{
        background: #ff8198;
    } */
</style>