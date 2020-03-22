<template>
  <tab-bar>
    <!-- 111 -->
    <tab-bar-item path="/home" v-bind:activeColor="color">
      <img slot="item-icon" src="@/assets/images/tabbar/home.svg" alt="" />
      <img slot="item-icon-active" src="@/assets/images/tabbar/home_active.svg" alt="" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" v-bind:activeColor="color">
      <img slot="item-icon" src="@/assets/images/tabbar/category.svg" alt="" />
      <img slot="item-icon-active" src="@/assets/images/tabbar/category_active.svg" alt="" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/shopcart" v-bind:activeColor="color">
      <img slot="item-icon" src="@/assets/images/tabbar/cart.svg" alt="" />
      <img slot="item-icon-active" src="@/assets/images/tabbar/cart_active.svg" alt="" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" v-bind:activeColor="color">
      <img slot="item-icon" src="@/assets/images/tabbar/profile.svg" alt="" />
      <img slot="item-icon-active" src="@/assets/images/tabbar/profile_active.svg" alt="" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/tabBarItem'
export default {
  name:"MainTabBar",
  components: {
    TabBar: TabBar,
    TabBarItem: TabBarItem
  },
  data(){
    return {
      color:"red"
      // color:"deepPink"
    }
  }
}
</script>

<style>

</style>