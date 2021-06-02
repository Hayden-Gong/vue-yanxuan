<template>
    <div>
        <div class="user_top" @click="showLoginModal">
            <img src="../assets/avatar.png" alt="">
            <h3>点击登录</h3>
            <i class="van-icon van-icon-arrow"></i>
        </div>
        
        <van-grid :column-num="3" square>
            <van-grid-item 
            v-for="value,index in myModules" 
            :key="index" 
            :icon="value.icon" 
            :text="value.title"
            />
        </van-grid>

        <van-popup v-model="isShowLoginModal">
            <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="pwd"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">登录</van-button>
            </div>
            </van-form>
        </van-popup>
    </div>
</template>

<script>
import { LoginByWeb } from '@/http/api'
export default {
    data () {
        return {
            myModules: [
                { title:'我的订单', icon: 'label-o' },
                { title:'优惠券', icon: 'bill-o' },
                { title:'礼品卡', icon: 'goods-collect-o' },
                { title:'我的收藏', icon: 'location-o' },
                { title:'我的足迹', icon: 'flag-o' },
                { title:'会员福利', icon: 'contact' },
                { title:'地址管理', icon: 'aim' },
                { title:'账号安全', icon: 'warn-o' },
                { title:'联系客服', icon: 'service-o' },
                { title:'帮助中心', icon: 'question-o' },
                { title:'意见反馈', icon: 'smile-comment-o' }
            ],
            isShowLoginModal: false,
            username: '',
            password: ''
        }
    },
    methods: {
        showLoginModal(){
            this.isShowLoginModal = true
        },
        onSubmit(values) {
            console.log('submit', values);
            LoginByWeb(values).then(res=>{
                console.log(res);
            })
        },
    }
}
</script>
 
<style lang = "less" scoped>
    .user_top {
        padding: .2rem .1rem;
        background-color: #333;
        color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
            width: .7rem;
            border-radius: .35rem;
        }
        h3 {
            flex: 1;
            padding-left: .1rem;
        }
    }
    .van-popup {
        width: 85%;
        padding: .1rem 0;
    }
</style>