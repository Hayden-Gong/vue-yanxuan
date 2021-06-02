<template>
    <div>
        <!-- 搜索产品列表页 -->
        <van-dropdown-menu>
            <van-dropdown-item title="综合" disabled />
            <van-dropdown-item title="价格" v-model="priceVal" :options="option1" @change="priceChange(priceVal)"/>
            <van-dropdown-item title="分类" v-model="categoryVal" :options="filterCategory" @change="categoryChange"/>
        </van-dropdown-menu>

        <!-- 如果没有搜索到产品 则不展示Products 展示Empty组件 -->
        <van-empty v-if="goodsList.length==0" image="search" description="抱歉，搜索不到产品" />
        <Products v-else :goodsList="goodsList" />
    </div>
</template>

<script>
import Products from '../Products'
export default {
    props:["goodsList", "filterCategory"],
    data () {
        return {
            priceVal: '',
            categoryVal: 0,
            option1: [
                { text: '价格由高到低', value: 'desc' },
                { text: '价格由低到高', value: 'asc' }
            ]
        }
    },
    components: {
        Products
    },
    methods: {
        categoryChange(val){
            this.$emit("categoryChange", val);
        },
        priceChange(val){
            this.$emit("priceChange", val);
        }
    },
    beforeUpdate(){
        // 把this.categoryVal 的值改成checked为真的那一项的value值
        this.filterCategory.map(item=>{
            if(item.checked){
                this.categoryVal = item.value
            }
        })
    }
}
</script>
 
<style lang = "less" scoped>
    
</style>