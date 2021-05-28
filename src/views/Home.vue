<template>
  <div class="home">
    首页
    <van-button type="primary">主要按钮</van-button>
    <van-stepper v-model="value" />
  </div>
</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      value: 1,
    };
  },
  components: {
    
  }
}
</script>
