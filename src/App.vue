<template>
  <div id="app">
    <router-view />
    <!-- 在某些页面不需要tabbar -->
    <AppTabbar v-if="$route.meta.isShowTabbar" />
  </div>
</template>

<script>
import AppTabbar from "@/components/AppTabbar"
export default {
  components: {
    AppTabbar
  }
}
</script>


<style lang="less">
#app {
  background-color: #efefef;
  min-height: 100%;
  font-size: 0.14rem;
}
html,
body {
  height: 100%;
}
html {
  font-size: 100px !important;
}
</style>
