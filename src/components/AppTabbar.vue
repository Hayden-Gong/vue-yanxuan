<template>
    <div>
        <!-- 底部标签栏 -->
        <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" @click="$router.push('/home')">首页</van-tabbar-item>
        <van-tabbar-item icon="label-o" @click="$router.push('/topic')">专题</van-tabbar-item>
        <van-tabbar-item icon="friends-o" @click="$router.push('/category')">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o" :badge=cartBadge @click="$router.push('/cart')">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" @click="$router.push('/mine')">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            cartBadge: ''
        }
    },
    computed: {
        active: {
            get(){ return this.$route.meta.tabbarActiveNum },
            set(){}
        }
    },
    methods:{
        changeBadge(val){
            this.cartBadge = val
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>