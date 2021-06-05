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
        <div class="brand">
          <div class="home_title">品牌制造商直供</div>
          <ul>
            <li v-for="item in brandListData" :key="item.id">
              <img :src="item.pic_url" alt="">
              <h4>{{item.name}}</h4>
              <p>{{item.floor_price | RMBformat}}</p>
            </li>
          </ul>
        </div>

        <!-- 新品首发 -->
        <div class="new">
          <div class="home_title">周一周四·新品首发</div>
          <ul class="product_list">
            <li v-for="item in newGoodsList" :key="item.id">
              <img :src="item.list_pic_url" alt="">
              <div>{{item.name}}</div>
              <section>{{item.retail_price | RMBformat}}</section>
            </li>
          </ul>
        </div>

        <!-- 人气推荐 -->
        <div class="hot">
          <div class="home_title">人气推荐</div>
            <van-card
              v-for="item in hotGoodsList"
              :key="item.id"
              :price="item.retail_price.toFixed(2)"
              :desc="item.goods_brief"
              :title="item.name"
              :thumb="item.list_pic_url"
            />
        </div>

        <!-- 专题精选 -->
        <div class="topic">
          <div class="home_title">专题精选</div>
          <van-swipe :loop="false" :width="300" :show-indicators=false>
            <van-swipe-item v-for="item in topicList" :key="item.id">
              <img :src="item.item_pic_url" alt="" style="width:100%;height:2rem">
              <p class="title">{{item.title}}</p>
              <p class="subtitle">{{item.subtitle}}</p>
            </van-swipe-item>
          </van-swipe>
        </div>

        <!-- 分类商品展示 -->
        <div class="category" v-for="item in categoryList" :key="item.id">
          <div class="home_title">{{item.name}}</div>
          <ul class="product_list">
            <li v-for="goods in item.goodsList" :key="goods.id">
              <img :src="goods.list_pic_url" alt="">
              <div>{{goods.name}}</div>
              <section>{{goods.retail_price | RMBformat}}</section>
            </li>
          </ul>
        </div>
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
        brandListData: [],
        newGoodsList: [],
        hotGoodsList: [],
        topicList: [],
        categoryList: [],
      };
    },
    created(){
      GetHomeData().then(res=>{
        let { banner, channel, brandList, newGoodsList, hotGoodsList, topicList, categoryList } = res.data
        this.bannerData = banner
        this.channelData = channel
        this.brandListData = brandList
        this.newGoodsList = newGoodsList
        this.hotGoodsList = hotGoodsList
        this.topicList = topicList
        this.categoryList = categoryList
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
      }
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
    },
    beforeRouteLeave(to, form, next) {
      this.updateIsShowShadow(false)
      next()
    }
  }
</script>

<style lang = "less" scoped>
  .home {
    padding-bottom: .5rem;
  }
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
  .home_title {
    text-align: center;
    line-height: .5rem;
    font-size: .2rem;
  }
  .brand {
    margin: .2rem 0;
    background-color: #fff;
    font-size: .14rem;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 49%;
        position: relative;
        img {
          width: 100%;
        }
        h4 {
          position: absolute;
          top: .15rem;
          left: .1rem;
        }
        p {
          position: absolute;
          top: .4rem;
          left: .1rem;
          color: #8b0000;
        }
      }
    }
  }
  .new {
    background-color: #fff;
    padding-top: .1rem;
  }
  .product_list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    padding: .1rem;
    li {
      width: 49%;
      img {
        width: 100%;
      }
      section {
        margin-top: 5px;
        color: darkred;
      }
    }
  }
  .hot {
    margin-top: 10px;
    background-color: white;
    font-size: .12rem;
    .van-card__content {
      box-sizing: border-box;
      padding-top: .08rem;
      .van-card__title {
        font-size: .18rem;
      }
      .van-card__desc {
        padding-top: .1rem;
        font-size: .14rem;
      }
    }
  }
  .topic {
    background-color: #fff;
    margin-top: .2rem;
    padding: 0 .08rem;
    .van-swipe-item {
      padding: .08rem;
      box-sizing: border-box;
    }
    p {
      line-height: .2rem;
    }
  }
  .category {
    background-color: #fff;
    padding-top: .2rem;
  }
</style>