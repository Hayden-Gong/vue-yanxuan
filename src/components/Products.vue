<template>
    <div>
        <ul>
            <li v-for="(item) in goodsList" :key="item.id" @click="goTODetail(item.id)">
                <img v-lazy="item.list_pic_url || imgSrc" style="display:block;" width="100%" alt="" />
                <div class="van-ellipsis">{{item.name}}</div>
                <div class="price">{{item.retail_price | RMBformat}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:["goodsList"],
    data () {
        return {
            imgSrc:require("@/assets/avatar.png")
        }
    },
    methods:{
        goTODetail(id){
            this.$router.push("/detail?id="+id)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    ul{
    padding: .1rem 2%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width: 49%;
        margin-bottom: .1rem;
        background: #fff;
        text-align: center;
        line-height: .3rem;
        .price{
            color: darkred;
        }
    }
}
</style>