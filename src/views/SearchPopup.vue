<template>
    <div class="search-popup">
        <van-search
            v-model="searchvalue"
            show-action
            :placeholder="placeholderVal"
            @search="onSearchEnter"
            @cancel="onCancel"
            @input="onInput"
        />

        <!-- 底下组件展示3个界面之一 -->
        <HistoryHot
            v-if="blockShow==1"
            :historyKeywordList="historyKeywordList"
            :hotKeywordList="hotKeywordList"
            @tagClick="tagClick"
        />
        <SearchTipsList
            v-else-if="blockShow==2"
            :searchTips="searchTips"
            @cellClick="tagClick"
        />
        <SearchProductList 
            v-else-if="blockShow==3"
            :goodsList="goodsList"
	        :filterCategory="filterCategory"
            @categoryChange="categoryChange"
            @priceChange="priceChange"
        />
    </div>
</template>

<script>
import SearchProductList from '@/components/search/SearchProductList'
import SearchTipsList from '@/components/search/SearchTipsList'
import HistoryHot from '@/components/search/HistoryHot'
import { mapMutations } from 'vuex'
import { GetHisHotData, GetSearchTipsData, GetSearchData } from '@/http/api'

export default {
    data () {
        return {
            searchvalue: '',
            blockShow: 1,
            placeholderVal: '',
            historyKeywordList: [],
            hotKeywordList: [],
            searchTips: [],
            goodsList: [],
            filterCategory: [],
            // 价格排序 desc由高到低 asc由低到高
            order:"desc",
            // 分类id
            categoryId:0,
            // 排序方式：按照id排序还是按照价格price排序
            sort:"id"
        }
    },
    created(){
        GetHisHotData().then(res=>{
            let {defaultKeyword, historyKeywordList, hotKeywordList} = res.data
            this.placeholderVal = defaultKeyword.keyword,
            this.historyKeywordList = historyKeywordList,
            this.hotKeywordList = hotKeywordList
        })
    },
    methods: {
        ...mapMutations({
            updateIsShowShadow: 'showshadow/updateIsShowShadow'
        }),
        onSearchEnter(val){
            // 使用搜索栏时重置筛选条件
            this.order = 'desc'
            this.categoryId = 0
            this.sort = 'id'
            this.onSearch(val)
            
        },
        onSearch(val) {
            GetSearchData({
                keyword:val,
                page:1,
                size:20,
                order:this.order,     // 价格排序
                categoryId:this.categoryId,    // 分类id
                sort:this.sort    // 排序方式
            }).then(res=>{
                this.goodsList = res.data.goodsList

                let arr = res.data.filterCategory
                arr = JSON.parse(JSON.stringify(arr).replace(/name/g, 'text').replace(/id/g, 'value'))
                this.filterCategory = arr

                this.blockShow=3;
            })
        },
        onCancel() {
            this.$router.go(-1)
            // this.updateIsShowShadow(false)
        },
        onInput(val){
            this.blockShow = 2
            // 发送请求 获取搜索提示
            GetSearchTipsData({
                keyword:val
            }).then(res=>{
                if(res.errno==0){
                    this.searchTips = res.data
                }
            })

            if(val=='') this.blockShow = 1
        },
        categoryChange(val){
            this.categoryId = val
            this.onSearch(this.searchVal)
        },
        priceChange(val){
            this.order=val;
            this.sort="price";
            this.onSearch(this.searchVal)
        },
        tagClick(val){
            this.searchVal=val
            this.onSearch(this.searchVal)
        },
    },
    components:{
        SearchProductList, 
        SearchTipsList, 
        HistoryHot
    }
}
</script>
 
<style lang = "less" scoped>
    .search-popup {
        z-index: 2;
        position: absolute;
        width: 100%;
        min-height: 100%;
        top: 0;
        background-color: #efefef;
    }
</style>