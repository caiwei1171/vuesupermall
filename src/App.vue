<template>
  <div id="app">
    <!-- exclude="Detail"表示Detail不缓存 -->
    <keep-alive exclude="Detail">
      <router-view></router-view> 
    </keep-alive> 
    <main-tab-bar></main-tab-bar> 
  </div>
</template>

<script>
import MainTabBar from '@/components/content/MainTabBar/MainTabBar'
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "./assets/css/base.css";
</style>
