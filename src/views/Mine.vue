<template>
    <div>
        <div class="user_top">
            <img :src="avatarSrc" alt="" @click="showLoginModal">
            <h3 @click="showLoginModal">{{nickname}}</h3>
            <van-icon :name="logIcon" @click="showLogoutModal" />
        </div>
        
        <van-grid :column-num="3" square>
            <van-grid-item 
            v-for="value,index in myModules" 
            :key="index" 
            :icon="value.icon" 
            :text="value.title"
            />
        </van-grid>

        <!-- 登录弹出层 -->
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

        <!-- 退出确认框 -->
        <van-dialog v-model="isShowLogoutModal" title="登出确认框" show-cancel-button @confirm="onLogout">
            <div style="text-align:center;padding:20px 0;">确定退出登录吗?</div>
        </van-dialog>
    </div>
</template>

<script>
import { LoginByWeb } from '@/http/api'
import avatarSrc from '@/assets/avatar.png'
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
            isShowLogoutModal: false,
            username: '',
            password: '',
            avatarSrc: avatarSrc,
            nickname: '点击登录',
            logIcon: 'arrow'
        }
    },
    methods: {
        showLoginModal(){
            if(localStorage.getItem("token"))
                return
            // 展示登录框
            this.isShowLoginModal = true
        },
        showLogoutModal(){
            if(!localStorage.getItem("token")){
                this.isShowLoginModal = true
                return
            }
            // 展示登出框
            this.isShowLogoutModal = true
        },
        onSubmit(values) {
            console.log('submit', values);
            LoginByWeb(values).then(res=>{
                let userInfo = res.data.userInfo
                // 登录成功后的业务逻辑
                // 1 提示用户登录成功
                this.$toast.success("登录成功！")
                // 2 保存token值和用户常用信息到本地
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userInfo", JSON.stringify(userInfo))
                setTimeout(() => {
                    // 3 关闭登录窗口
                    this.isShowLoginModal = false;
                // 4 把用户信息渲染到页面上
                this.avatarSrc = userInfo.avatar
                this.nickname = userInfo.nickname
                this.logIcon = "cross"
                }, 500);
            })
        },
        onLogout(){
            this.$toast.success("退出成功！")
            setTimeout(() => {
                localStorage.removeItem("token")
                localStorage.removeItem("userInfo")
                this.avatarSrc = avatarSrc
                this.nickname = "点击登录"
                this.logIcon = "arrow"
            }, 500);
        }
    },
    created(){
        // 页面刷新时判断用户是否登录
        let token = localStorage.getItem("token")
        if(token){
            let userInfo = JSON.parse(localStorage.getItem("userInfo"))
            this.avatarSrc = userInfo.avatar
            this.nickname = userInfo.nickname
            this.logIcon = "cross"
        }
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