<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div v-bind:style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#f16b6b4d'
    }
  },
  computed: {
    isActive: function () {
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle: function () {
      return this.isActive ? {"color": this.activeColor} : {}
    }
  },
  methods: {
    itemClick: function () {
      if(this.$router.history.current.path != this.path){
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>