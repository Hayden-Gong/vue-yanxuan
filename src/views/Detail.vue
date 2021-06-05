<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in goodsGallery" :key="index">
        <img :src="item.img_url" alt="" style="width: 100%" />
      </van-swipe-item>
    </van-swipe>

    <!-- 售后 -->
    <van-row>
      <van-col span="8">
        <van-icon name="checked" />
        30天无忧退货
      </van-col>
      <van-col span="8">
        <van-icon name="checked" />
        48小时快速退款
      </van-col>
      <van-col span="8">
        <van-icon name="checked" />
        满88元免邮费
      </van-col>
    </van-row>

    <!-- 商品概述 -->
    <div class="info">
      <h2>{{ goodsInfo.name }}</h2>
      <div>{{ goodsInfo.goods_brief }}</div>
      <div>{{ goodsInfo.retail_price | RMBformat }}</div>
    </div>

    <van-cell title="展示弹出层" is-link />

    <!-- 参数 -->
    <div class="parameter">
      <h2>商品参数</h2>
      <ul>
        <li v-for="(item, index) in goodsAttribute" :key="index">
          <span>{{ item.name }}</span>
          <big>{{ item.value }}</big>
        </li>
      </ul>
    </div>

    <!-- 展示描述详情图片 -->
    <div class="goods-desc" v-html="goodsInfo.goods_desc"></div>

    <!-- 常见问题 -->
    <div class="issue">
      <van-divider
        :style="{
          color: '#000',
          borderColor: 'gray',
          padding: '0 90px',
          height: '40px',
          fontSize: '18px',
        }"
      >
        常见问题
      </van-divider>
      <div class="content">
        <ul>
          <li v-for="(item, index) in goodsIssue" :key="index">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 相关产品 -->
    <div class="related">
      <van-divider
        :style="{
          color: '#000',
          borderColor: 'gray',
          padding: '0 90px',
          height: '40px',
          fontSize: '18px',
        }"
      >
        相关产品
      </van-divider>

      <div class="goodsList">
        <Products :goodsList="goodsList" />
      </div>
    </div>

    <!-- 底部商品导航 -->
    <van-goods-action>
      <van-goods-action-icon
        :icon="isCollected ? 'star' : 'star-o'"
        :text="isCollected ? '已收藏' : '收藏'"
        color="#ff5000"
        @click="hdClickCollect()"
      />
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="isLogin ? goodsCount : ''"
        @click="$router.push('/cart')"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="showSku"
      />
      <van-goods-action-button type="danger" text="立即购买" @click="showSku" />
    </van-goods-action>

    <van-sku
      ref="sku"
      v-model="isShowSku"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import {
  GetProductDetail,
  GetRelated,
  GetCartCount,
  AddToCart,
} from "@/http/api";
import Products from "@/components/Products";
export default {
  data() {
    return {
      // 商品详情数据
      goodsGallery: [],
      goodsInfo: {},
      goodsAttribute: [],
      goodsIssue: [],
      goodsList: [],
      productList: [],
      isCollected: false,

      isLogin: false,

      // sku数据
      isShowSku: false,
      sku: {
        tree: [],
        price: "1.00",
        // 商品库存
        stock_num: 227,
        // 是否显示库存
        hide_stock: false,
      },
      goods: {
        // 默认商品 sku缩略图
        picture: "",
      },
      // 购物车数量
      goodsCount: 0,
    };
  },
  created() {
    // 获取商品详情
    GetProductDetail({ id: this.$route.query.id }).then((res) => {
      // 商品详情信息
      this.goodsGallery = res.data.gallery;
      this.goodsInfo = res.data.info;
      this.goodsAttribute = res.data.attribute;
      this.goodsIssue = res.data.issue;
      this.productList = res.data.productList;
      // sku信息
      this.goods.picture = res.data.info.list_pic_url;
      this.sku.price = res.data.info.retail_price;
      this.sku.stock_num = res.data.info.goods_number;
    }),
      // 获取相关产品
      GetRelated({ id: this.$route.query.id }).then((res) => {
        this.goodsList = res.data.goodsList;
      });
    // 获取购物车数量
    GetCartCount().then((res) => {
      this.goodsCount = res.data.cartTotal.goodsCount;
    });

    // let token = localStorage.getItem('token')
    // this.isLogin = token? true:false
  },
  methods: {
    showSku() {
      this.isShowSku = true;
    },
    onBuyClicked() {
      this.$toast("余额不足");
    },
    onAddCartClicked() {
      // 获取登录状态
      this.isLogin = this.utils.CheckLoginState();
      if (!this.isLogin) return;

      AddToCart({
        goodsId: this.$route.query.id,
        productId: this.productList[0].id,
        number: this.$refs.sku.getSkuData().selectedNum,
      }).then((res) => {
        // 关闭sku面板
        this.isShowSku = false;

        // 显示成功提示
        this.$toast.success("添加成功！");

        // 更新购物车数量
        this.goodsCount = res.data.cartTotal.goodsCount;
      });
    },
    // 点击收藏按钮
    hdClickCollect() {
      // 获取登录状态
      this.isLogin = this.utils.CheckLoginState();
      if (!this.isLogin) return;

      this.isCollected = !this.isCollected;
    },
  },
  components: {
    Products,
  },
};
</script>
 
<style lang = "less" scoped>
.van-col {
  line-height: 0.3rem;
}
.info {
  padding: 0.2rem 0;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  font-size: 0.14rem;
  text-align: center;
  line-height: 0.4rem;
  h2 {
    font-size: 0.2rem;
  }
}
.van-cell {
  margin-bottom: 0.2rem;
}
.parameter {
  padding: 0.1rem;
  background-color: #fff;
  h2 {
    line-height: 0.4rem;
    font-size: 0.2rem;
  }
  li {
    background: #efefef;
    border-radius: 0.06rem;
    height: 0.3rem;
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.05rem;
    span {
      color: #999;
      width: 20%;
      margin-right: 5px;
      text-align: right;
    }
    big {
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
/* 如果子组件样式无法生效，可以试试/deep/ 深度样式写法 */
/deep/ .goods-desc img {
  max-width: 100%;
  display: block;
}
.issue {
  padding-top: 0.1rem;
  background-color: #fff;
  li {
    padding: 0 0.1rem 0 0.2rem;
    h3 {
      line-height: 0.4rem;
      padding: 0 0.1rem 0 0.2rem;
      font-size: 0.16rem;
    }
    p {
      font-size: 0.14rem;
      padding: 0 0.1rem 0 0.2rem;
      color: #666;
    }
  }
}
.related {
  background-color: #fff;
}
/deep/ .van-sku-messages {
  padding: 0;
}
.van-sku-container {
  min-height: auto;
}
</style>