<template>
    <div class="topic">
        <div class="box" v-for="item in topicList" :key="item.id">
            <img :src="item.scene_pic_url" alt="" style="width:100%">
            <div class="title">{{item.title}}</div>
            <div class="subtitle">{{item.subtitle}}</div>
            <div class="price">{{item.price_info | RMBformat}}</div>
        </div>
    </div>
</template>

<script>
import { GetTopicData } from '@/http/api'
export default {
    data () {
        return {
            topicList: []
        }
    },
    created(){
        GetTopicData({
            page:1,
            size:10
        }).then(res=>{
            console.log(res.data.data);
            this.topicList = res.data.data
        })
    }
}
</script>
 
<style lang = "less" scoped>
.topic { padding-bottom: .3rem; }
.box {
    background-color: #fff;
    text-align: center;
    margin-bottom: .2rem;
    padding-bottom: .1rem;
    .title {
        font-size: .18rem;
        margin: .1rem 0;
    }
    .subtitle {
        font-size: .16rem;
        margin: .2rem 0;
    }
    .price {
        font-size: .14rem;
    }
}
</style>