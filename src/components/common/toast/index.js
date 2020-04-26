import Toast from './Toast';
const obj = {};
obj.install = function(Vue){
	// 1.创建组件构造器
	const toastConstruction = Vue.extend(Toast);
	// 2.创建 new 实例
	const toast = new toastConstruction();
	// 3.将组件对象，手动挂载到某个元素上
	toast.$mount(document.createElement('div'));
	// 4.toast.$el
	document.body.appendChild(toast.$el);	
	// 5.挂到原型链上
	Vue.prototype.$toast = toast;
}
export default obj
