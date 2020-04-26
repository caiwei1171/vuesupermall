module.exports = {
	plugins:{
		autoprefixer:{},
		"postcss-px-to-viewport":{
			viewportWidth:375,//视窗的宽度，对应设计稿宽
			viewportHeight:667,//视窗的宽度，对应设计稿宽
			unitPrecision:5,//指定'px'转换为视图单位制的小数位数
			viewportUnit:'vw',//指定需要转换的视图单位
			// selectorBlackList:['ignore','tab-bar','tab-bar-item'],//指定不需要要转换的类
			minPixelValue:1,//小于或等于时不转化
			medioQuery:false,//允许在媒体查询中转换'px'
			exclude:[/TabBar/]//[]内为正则表达式
		}
	}
}