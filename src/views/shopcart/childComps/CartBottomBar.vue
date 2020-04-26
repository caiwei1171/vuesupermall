<template>
	<div class="bottom-bar">
		<div class="check-content">
			<CheckButton class="check-button" @checkBtnClick="checkBtnClick" :isChecked="isSelectAll"/>
			<span>全选</span>
		</div>
		<span class="total-price">合计:{{totalPrice}}</span>
		<span class="calculate" @click="calcClick">去计算:({{checkLength}})</span>
	</div>
</template>

<script>
import CheckButton from '@/components/content/checkButton/CheckButton'
import {mapGetters} from 'vuex'
export default {
	name:'CartBottomBar',
	components:{
		CheckButton
	},
	computed:{
			...mapGetters(['cartList']),
			totalPrice(){
				return '￥' + this.cartList.filter(item => {
					return item.checked
				}).reduce((preValue,item) => {
					return preValue + item.count*item.newPrice;
				},0)//.toFixed(2)
			},
			checkLength(){
				// return this.$store.state.cartList.filter(item => item.checked).length
				return this.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				if(!this.cartList.length) return false;
				// return !(this.cartList.filter(item => !item.checked).length);
				return !this.cartList.find(item => !item.checked);
			}
		},
		methods:{
			checkBtnClick(){
				// 判断是否有未选择
				let isSelectAll = this.cartList.find(item => item.checked);
				// 有未选中的内容，则全选中
				if(isSelectAll){
					this.cartList.forEach(item => {
						item.checked = false;
					})
				}else{
					this.cartList.forEach(item => {
						item.checked = true ;
					})
				}
			},
			calcClick(){
				if(!this.isSelectAll){
					this.$toast.show('请选择要购买的商品')
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar{
		position: fixed;
		bottom: 49px;
		left: 0;
		right: 0;
		display: flex;
		height: 40px;
		line-height: 40px;
		background:#eee;
		box-shadow: 0 -2 3px rgba(0,0,0,.2);
	}
	.check-content{
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 70px;
	}
	.check-button{
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}
	.total-price{
		margin-left: 15px;
		flex:1;
	}
	.calculate{
		width: 130px;
		background-color:red;
		text-align: center;
		color: #fff;
	}
</style>