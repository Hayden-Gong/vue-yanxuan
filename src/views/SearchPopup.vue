<template>
    <div class="search-popup">
        <!-- 搜索框 -->
        <van-search
            v-model="searchVal"
            show-action
            :placeholder="placeholderVal"
            @search="onSearchEnter"
            @input="onInput"
        >
            <!-- @cancel="onCancel" @cancel 默认清空搜索栏内容 -->
            <!-- 使用#action 自定义右侧按钮的内容 使用插槽后，cancel 事件将不再触发 -->
            <template #action>
                <div @click="onCancel">取消</div>
            </template>
        </van-search>

        <!-- 底下组件展示3个界面之一 -->

        <!-- 热门搜索与历史组件 -->
        <HistoryHot
            v-if="blockShow==1"
            :historyKeywordList="historyKeywordList"
            :hotKeywordList="hotKeywordList"
            @tagClick="tagClick"
        />
        <!-- 搜索提示组件 -->
        <SearchTipsList
            v-else-if="blockShow==2"
            :searchTips="searchTips"
            @cellClick="tagClick"
        />
        <!-- 搜索列表组件 -->
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
            searchVal: '',
            placeholderVal: '',
            // 决定展示的组件
            blockShow: 1,
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
            sort:"id",
            // 防抖定时器
            timer: null
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
        onSearchEnter(){
            // 使用搜索栏搜索时重置筛选条件
            this.order = 'desc'
            this.categoryId = 0
            this.sort = 'id'
            this.onSearch(this.searchVal)
            
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
            if(this.blockShow !== 1){
                this.blockShow = 1
                return
            }

            this.$router.go(-1)
            // this.updateIsShowShadow(false)
        },
        onInput(val){
            this.blockShow = 2

            // 防抖
            if(this.timer) clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                // 发送请求 获取搜索提示
                GetSearchTipsData({
                    keyword:val
                }).then(res=>{
                    if(res.errno==0){
                        this.searchTips = res.data
                    }
                })
            }, 500);

            // 搜索栏为空时返回历史记录页
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
            this.searchVal=val;
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