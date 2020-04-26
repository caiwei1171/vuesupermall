<template>
  <div class="item-container">
    <div v-for=" (item,index) in subData" class="list" :key="index">
      <a :href="item.link">
        <img v-lazy="item.image" alt="">
        <!-- <img :src="item.image" alt=""> -->
        <div class="title">{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default{
  name:"TabContent",
  data(){
    return{
      getSubcategories:[]
    };
  },
  props:{
    subData:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style scoped>

.item-container{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  align-content: flex-start;
}
.list{
  width: 33%;
  padding: 10px 5px;
}
.list img{
  width: 50px;
  height: 50px;
}
.title{
  margin-top: 6px;
}
</style>