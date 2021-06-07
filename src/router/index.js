import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

// 解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'searchpopup',
        component: () => import(/* webpackChunkName: "SearchPopup" */ '../views/SearchPopup.vue')
      }
    ],
    meta: {
      tabbarActiveNum: 0,
      isShowTabbar: true
    }
  },
  {
    path: '/topic',
    component: () => import(/* webpackChunkName: "topic" */ '../views/Topic.vue'),
    meta: {
      tabbarActiveNum: 1,
      isShowTabbar: true
    }
  },
  {
    path: '/category',
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue'),
    meta: {
      tabbarActiveNum: 2,
      isShowTabbar: true
    }
  },
  {
    path: '/cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/Cart.vue'),
    meta: {
      tabbarActiveNum: 3,
      isShowTabbar: true
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "mine" */ '../views/Mine.vue'),
    meta: {
      tabbarActiveNum: 4,
      isShowTabbar: true
    }
  },
  // 商品详情
  {
    path: '/detail',
    component: () => import(/* webpackChunkName: "goodsdetail" */ '../views/Detail.vue'),
    meta: {
      tabbarActiveNum: 4,
      isShowTabbar: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 全局路由守卫/路由拦截  能够在每一次跳转路由之前拦截下来，做处理
// router.beforeEach((to,form,next)=>{
//   // to 要去往的路由对象
//   // from 路由对象从哪里出发

//   if(to.path == "/cart"){
//     let token = localStorage.getItem("token")
//     if(token){
//       next()
//     }else{
//       Vue.prototype.$toast('请先登录！');
//       setTimeout(() => {
//         next("/mine")
//       }, 1000);
//     }
//     return
//   }

//   if(to.path === "/home"){
  // store["_mutations"]["showshadow/updateIsShowShadow"][0](false);
// }

//   // 放行 必须调用next()才能继续跳转
//   next()
// })

export default router