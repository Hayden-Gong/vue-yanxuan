<template>
    <div class="history-hot">
        <div class="his-hot">
            <div class="hd">
                <h4>历史记录</h4>
                <van-icon name="delete-o" @click="clearHis"/>
            </div>
            <div class="bd">
                <van-tag plain type="primary" text-color="#666" v-for="(item,index) in historyKeywordList" :key="index" @click="tagClick(item)">{{item}}</van-tag>
            </div>
        </div>
        <div class="his-hot">
            <div class="hd">
                <h4>热门搜索</h4>
            </div>
            <div class="bd">
                <van-tag plain :type="item.is_hot? 'danger':'primary'" text-color="#666" v-for="(item,index) in hotKeywordList" :key="index" @click="tagClick(item.keyword)">{{item.keyword}}</van-tag>
            </div>
        </div>
    </div>
</template>

<script>
import { ClearHisData } from '@/http/api'
export default {
    props:['historyKeywordList', 'hotKeywordList'],
    data () {
        return {
            
        }
    },
    methods:{
        clearHis(){
            ClearHisData().then(res=>{
                // 成功通知
                this.$toast.success('清除成功');
                this.$router.go(0)
            })
        },
        tagClick(val){
    	    this.$emit("tagClick",val)
        }
    }
}
</script>
 
<style lang = "less" scoped>
    .his-hot {
        padding: .1rem .1rem .15rem;
        margin-bottom: .2rem;
        background-color: #fff;
        .hd {
            display: flex;
            justify-content: space-between;
            font-size: .18rem;
        }
        .van-tag {
            margin: .1rem .1rem .05rem 0;
        }
    }
    .van-tag--danger.van-tag--plain {
        color: #ee0a24 !important;
        border-color: #ee0a24 !important;
    }
</style>