<template>
  <div class='wraper-base' v-if="Object.keys(goods).length !== 0">
    <div class="title">{{goods.title}}</div>
    <div class="price-box">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="columns-box">
      <div v-for="(item,index) in goods.columns" class="columns-item" :key="index">{{item}}</div>  
    </div>  
    <div class="services-box">
      <div v-for="i in len" class="services-item" :key="i">
        <img :src="goods.services[i-1].icon" alt="">
        {{goods.services[i-1].name}} 
      </div>
    </div>   
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
export default {
  data(){
    return {
      len:0,
    };
  },
  props:{
    goods:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  components:{},
  computed:{},
  // 监控data中的数据变化
  watch:{},
  methods:{},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created(){},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted(){},
  beforeUpdate(){
    this.len = this.goods.services.length-1;
  }
}
</script>

<style scoped>
  .wraper-base{
    padding: 0 8px;
    margin-top: 15px;
    border-bottom: 5px solid #eee;
  }
  .title{
    color: #222222;
    font-size: 17px;
  }
  .price-box{
    margin-top: 10px;
  }
  .price-box > span{
    margin-left: 5px;
  }
  .price-box > .new-price{
    margin-left: 0;
    font-size: 24px;
    color: var(--color-high-text);
  }
  .old-price{
    font-size: 13px;
    text-decoration:line-through;
  }
  .discount{
    position: relative;
    bottom: 5px;
    color: #fff;
    background: var(--color-high-text);
    border-radius: 8px;
    font-size: 12px;
    padding: 2px 5px;
  }
  .columns-box{
    display: flex;
    justify-content:space-between;
    margin-top: 5px;
    color: rgba(100, 100, 100, 1);
    font-size: 13px;
    border-bottom: 1px solid #eee;
    line-height: 30px;
  }
  .services-box{
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    font-size: 14px;
    color: #222222;
  }
  .services-box img{
    height: 15px;
    width: 15px;
  }
  .services-item{}
</style>