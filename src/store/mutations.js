import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types.js"

export default {
	// mutations唯一目的修改state中的状态
	// mutations中的方法尽可能完成事件比较单一
	[ADD_COUNTER](state,payload){
		payload.count++;
	},
	[ADD_TO_CART](state,payload){
		// 选中状态
		payload.checked = true;
		state.cartList.push(payload);
	}
}