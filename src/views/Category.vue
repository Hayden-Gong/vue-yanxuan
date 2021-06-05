<template>
    <div>
        <!-- 顶部搜索栏 -->
        <van-search
          shape="round"
          placeholder="搜索商品"
          disabled
          @click="enterSearch"
        />

        <!-- 分类选择 -->
        <van-tree-select height="100vh" :items="categoryNames" :main-active-index.sync="active" @click-nav="switchCategory">
        <template #content>
            <van-image :src="currentCategory.banner_url"/>
            <p>{{currentCategory.front_desc}}</p>
            <div class="mytitle">
                <span></span>
                <h3>{{currentCategory.name}}</h3>
            </div>

            <van-grid :column-num="3">
                <van-grid-item 
                    v-for="item in currentCategory.subCategoryList"
                    :key="item.id"
                    :icon="item.wap_banner_url" 
                    :text="item.name" 
                 />
            </van-grid>
        </template>
        </van-tree-select>

        <!-- 黑色遮罩层 -->
        <transition name="van-fade">
            <div class="popup-shadow" v-if="isShowShadow"></div>
        </transition>

        <!-- 展示搜索弹出窗 -->
        <transition name="van-slide-right">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { GetCategoryData, GetCurrentCategory } from '@/http/api'
export default {
    data () {
        return {
            active: 0,
            categoryNames: [],
            categoryList: [],
            currentCategory: {}
        }
    },
    created(){
        GetCategoryData().then(res=>{
            this.categoryList = res.data.categoryList
            this.currentCategory = res.data.currentCategory
            this.categoryNames = res.data.categoryList.map(item=>{
                return { text: item.name }
            })
        })
    },
    computed: {
      ...mapState({
        isShowShadow: state => state.showshadow.isShowShadow
      }),
      
    },
    methods: {
      ...mapMutations({
        updateIsShowShadow: 'showshadow/updateIsShowShadow'
      }),
      enterSearch(){
        this.$router.push('/home/searchpopup')
        this.updateIsShowShadow(true)
      },
      switchCategory(){
        GetCurrentCategory(this.categoryList[this.active].id.toString()).then(res=>{
            this.currentCategory = res.data.currentCategory
        })
      }
    }
}
</script>
 
<style lang = "less" scoped>
.van-tree-select__content{
    flex: 4;
    text-align: center;
}
.van-sidebar-item {
    padding: .2rem .12rem;
}
.mytitle {
    height: 50px;
    position: relative;
    font-size: 16px;
    span {
        width: 50%;
        height: 2px;
        background-color: #ccc;
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }
    h3 {
        width: 30%;
        height: 40px;
        background-color: #fff;
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        line-height: 40px;
        color: #000;
    }
}
</style>