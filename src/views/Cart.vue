<template>
  <div>
    <!-- navbar -->
    <van-nav-bar title="购物车" 
      :right-text="isEditMode? '完成':'编辑'" 
      @click-right="isEditMode = !isEditMode" 
    />
    <!-- 售后保障 -->
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
    <!-- 商品列表 -->
    <van-checkbox-group v-model="result">
      <!-- 复选框 -->
      <van-checkbox
        :name="item.id"
        v-for="item in cartList"
        :key="item.id"
        @click="
          hdCheck(
            result.includes(item.id) ? '1' : '0',
            item.product_id.toString()
          )
        "
        :disabled="isEditMode"
      >
        <!-- 左滑删除单元格 -->
        <van-swipe-cell>
          <!-- 商品卡片 -->
          <van-card
            :num="item.number"
            :price="item.retail_price.toFixed(2)"
            desc="描述信息"
            :title="item.goods_name"
            :thumb="item.list_pic_url"
          >
            <template #footer v-if="isEditMode">
              <!-- 步进器 -->
              <van-stepper
                v-model="item.number"
                theme="round"
                button-size="20"
                disable-input
                @change="updateCartNum(item)"
              />
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              text="删除"
              type="danger"
              class="delete-button"
              @click="delCart(item.product_id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox>
    </van-checkbox-group>

    <!-- 订单提交栏 -->
    <van-submit-bar
      :price="cartTotal.checkedGoodsAmount * 100"
      button-text="结算订单"
      @submit="onSubmit"
    >
      <van-checkbox v-model="checkedAll" :disabled="isEditMode || !cartList.length">全选</van-checkbox>
      <template #tip style="text-align:center" >
        已选择{{ cartTotal.checkedGoodsCount }}件商品
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { Dialog } from "vant";
import {
  GetCartData,
  CheckCartProduct,
  DeleteCartProduct,
  UpdateStepper,
} from "@/http/api";
export default {
  data() {
    return {
      // 被选中的项
      result: [],
      cartList: [],
      cartTotal: {},
      // 是否编辑模式
      isEditMode: false,
      // 步进器
      stepperVal: 1,
    };
  },
  // 组件内部的路由守卫
  // 不用每次跳转都判断，节约性能，提高效率
  beforeRouteEnter(to, form, next) {
    // to 要去往的路由对象
    // from 路由对象从哪里出发

    let token = localStorage.getItem("token");
    if (token) {
      next();
    } else {
      Vue.prototype.$toast("请先登录！");
      setTimeout(() => {
        next("/mine");
      }, 1000);
    }
  },
  created() {
    // 获取购物车列表
    GetCartData().then((res) => {
      this.renderData(res.data);
    });
  },
  computed: {
    checkedAll: {
      get() {
        return this.cartList.length === this.result.length;
      },
      set(val) {
        let productIdList = this.cartList.map((item) => item.product_id).join();
        this.hdCheck(val ? "1" : "0", productIdList);
      },
    },
  },
  methods: {
    // 封装数据更新操作
    renderData(data) {
      let { cartList, cartTotal } = data;
      this.cartList = cartList;
      this.cartTotal = cartTotal;
      // 获取已勾选的商品
      this.result = cartList
        .filter((item) => item.checked)
        .map((item) => item.id);

      // 稍微来点视觉提示
      this.$toast.loading({
        duration: 100,
        message: "加载中...",
        forbidClick: true,
      });
    },
    // 提交订单操作
    onSubmit() {
      this.$toast.fail("余额不足！");
    },
    // 点击复选框
    hdCheck(isChecked, productIds) {
      if (this.isEditMode) return;
      // 发送请求更改选中状态
      CheckCartProduct({
        isChecked,
        productIds,
      }).then((res) => {
        this.renderData(res.data);
      });
    },
    // 步进器更新商品数量
    updateCartNum(item) {
      UpdateStepper({
        goodsId: item.goods_id,
        id: item.id,
        number: item.number,
        productId: item.product_id,
      }).then((res) => {
        this.renderData(res.data);
      });
    },
    // 删除按钮
    delCart(id) {
      this.$dialog.confirm({ message: '确定要删除该商品吗？' })
      .then(() => {
        DeleteCartProduct({ productIds:id.toString() }).then((res) => {
          this.renderData(res.data);
        });
      })
      .catch(() => { });
    },
  },
};
</script>
 
<style lang = "less" scoped>
.van-checkbox-group {
  padding: 0.1rem;
  background-color: #fff;
  /deep/ .van-checkbox__label {
    flex: 1;
  }
}
.van-submit-bar {
  margin-bottom: 0.5rem;
  .van-submit-bar__tip {
    display: flex;
    align-items: center;
    .van-button {
      margin: 0 0.08rem;
    }
  }
}
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
</style>