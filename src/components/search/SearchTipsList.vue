<template>
    <div>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            >
            <van-cell v-for="item in searchTips" :key="item" :title="item" @click="cellClick(item)"/>
        </van-list>
    </div>
</template>

<script>
export default {
    props:['searchTips'],
    data () {
        return {
            loading: false,
            finished: true,
        }
    },
    methods: {
        cellClick(val){
    	    this.$emit("cellClick",val)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>