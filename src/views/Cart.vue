<template>
  <div>购物车页面</div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {};
  },
  // 组件内部的路由守卫
  // 不用每次跳转都判断，节约性能，提高效率
  beforeRouteEnter(to, form, next) {
    // to 要去往的路由对象
    // from 路由对象从哪里出发

    let token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      Vue.prototype.$toast("请先登录！");
      setTimeout(() => {
        next("/mine");
      }, 1000);
    }
  },
};
</script>
 
<style lang = "less" scoped>
</style>