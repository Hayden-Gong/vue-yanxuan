<template>
    <div>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in goodsGallery" :key="index">
                <img :src="item.img_url" alt="" style="width:100%">
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
            <h2>{{goodsInfo.name}}</h2>
            <div>{{goodsInfo.goods_brief}}</div>
            <div>{{goodsInfo.retail_price | RMBformat}}</div>
        </div>

        <van-cell title="展示弹出层" is-link />

        <!-- 参数 -->
        <div class="parameter">
            <h2>商品参数</h2>
            <ul>
                <li v-for="(item,index) in goodsAttribute" :key="index">
                    <span>{{item.name}}</span>
                    <big>{{item.value}}</big>
                </li>
            </ul>
        </div>

        <!-- 展示描述详情图片 -->
        <div class="goods-desc" v-html="goodsInfo.goods_desc"></div>

        <!-- 常见问题 -->
        <div class="issue">
            <van-divider :style="{ 
                color: '#000', 
                borderColor: 'gray',
                padding: '0 90px', 
                height: '40px',
                fontSize: '18px'
            }">
            常见问题
            </van-divider>
            <div class="content">
                <ul>
                    <li v-for="(item,index) in goodsIssue" :key="index">
                        <h3>{{item.question}}</h3>
                        <p>{{item.answer}}</p>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 相关产品 -->
        <div class="related">
            <van-divider :style="{ 
                color: '#000', 
                borderColor: 'gray',
                padding: '0 90px', 
                height: '40px',
                fontSize: '18px'
            }">
            相关产品
            </van-divider>

            <div class="goodsList">
                <Products :goodsList="goodsList" />
            </div>
        </div>

        <!-- 底部商品导航 -->
        <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
    </div>
</template>

<script>
import { GetProductDetail, GetRelated } from '@/http/api'
import Products from '@/components/Products'
export default {
    data() {
        return {
            goodsGallery: [],
            goodsInfo: {},
            goodsAttribute: [],
            goodsIssue: [],
            goodsList: []
        }
    },
    created() {

        GetProductDetail({ id:this.$route.query.id }).then(res=>{
            this.goodsGallery = res.data.gallery
            this.goodsInfo = res.data.info
            this.goodsAttribute = res.data.attribute
            this.goodsIssue = res.data.issue
        }),
        GetRelated({ id:this.$route.query.id }).then(res=>{
            this.goodsList = res.data.goodsList
        })
    },
    components: {
        Products
    }
}
</script>
 
<style lang = "less" scoped>
    .van-col {
        line-height: .3rem;
    }
    .info {
        padding: .2rem 0;
        background-color: #fff;
        border-bottom: 1px solid #ccc;
        font-size: .14rem;
        text-align: center;
        line-height: .4rem;
        h2 {
            font-size: .2rem;
        }
    }
    .van-cell {
        margin-bottom: .2rem;
    }
    .parameter {
        padding: .1rem;
        background-color: #fff;
        h2 {
            line-height: .4rem;
            font-size: .2rem;
        }
        li {
            background: #efefef;
            border-radius: .06rem;
            height: .3rem;
            align-items: center;
            display: flex;
            justify-content: space-between;
            margin-bottom: .05rem;
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
    /deep/ .goods-desc img{
        max-width: 100%;
        display: block;
    }
    .issue {
        padding-top: .1rem;
        background-color: #fff;
        li {
            padding: 0 .1rem 0 .2rem;
            h3 {
                line-height: .4rem;
                padding: 0 .1rem 0 .2rem;
                font-size: .16rem;
            }
            p {
                font-size: .14rem;
                padding: 0 .1rem 0 .2rem;
                color: #666;
            }
        }
    }
    .related {
        background-color: #fff;
        
    }
</style>