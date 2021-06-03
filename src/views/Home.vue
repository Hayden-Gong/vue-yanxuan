<template>
  <div class="home">
    <transition name="van-fade">
      <div v-if="$route.path === '/home'">
        <!-- 顶部搜索栏 -->
        <van-search
          shape="round"
          placeholder="搜索商品"
          disabled
          @click="enterSearch"
        />

        <!-- banner轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1989fa">
          <van-swipe-item v-for="(item,index) in bannerData" :key="index">
            <img :src="item.image_url" alt="" style="width:100%">
          </van-swipe-item>
        </van-swipe>

        <!-- 频道分类栏 -->
        <van-grid :column-num="5">
          <van-grid-item v-for="(item,index) in channelData" :key="index" :icon="item.icon_url" :text="item.name" />
        </van-grid>

        <!-- 供应商栏 -->
        <van-grid :column-num="2">
          <van-grid-item v-for="(item,index) in brandListData" :key="index" :text="item.name">
            <van-image :src="item.pic_url" />
          </van-grid-item>
        </van-grid>


      </div>
    </transition>
    
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
import { GetHomeData } from '@/http/api'
  export default {
    name: 'Home',
    data() {
      return {
        bannerData: [],
        channelData: [],
        brandListData: []
      };
    },
    created(){
      GetHomeData().then(res=>{
        let { banner, channel, brandList } = res.data
        this.bannerData = banner
        this.channelData = channel
        this.brandListData = brandList
      }).catch(err=>{
        console.log(err);
      })
    },
    computed: {
      ...mapState({
        isShowShadow: state => state.showshadow.isShowShadow
      })
    },
    methods: {
      ...mapMutations({
        updateIsShowShadow: 'showshadow/updateIsShowShadow'
      }),
      enterSearch(){
        this.$router.push('/home/searchpopup')
        this.updateIsShowShadow(true)
      },
    },
    components: {
      
    },
    watch: {
      // 监听父子级关系的路由的切换
      $route(to,from){
        if(to.path==='/home'){
          this.updateIsShowShadow(false)
        }
      }
    }
  }
</script>

<style>
  /* vue动画 */
  /* v-enter / v-leave v是transition标签设置的name值 */
  
  /* 进入过渡的初始状态 */
  /* .slide-enter, .slide-leave-to {
    right: -100%;
  } */
  /* 过渡时间的设置 */
  /* .slide-enter-active, .slide-leave-active {
    transition: all .5s
  } */
  /* 过渡结束的状态, 离开过渡的初始状态 */
  /* .slide-enter-to, .slide-leave {
    right: 0;
  } */

  .popup-shadow {
    z-index: 1;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: rgba(0,0,0,0.8);
  }
</style>