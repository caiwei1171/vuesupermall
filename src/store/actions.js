import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types.js"

export default {
	addCart(context,payload){
		return new Promise ((resolve) => {
			// 1.payload添加新商品
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
			// 2.判断oldProduct
			if(oldProduct){
				context.commit(ADD_COUNTER,oldProduct);
				resolve('商品数量+1');
			}else{
				payload.count = 1
				context.commit(ADD_TO_CART,payload);
				resolve('添加新商品成功');
			}
		})
	}
}