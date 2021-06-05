import router from "@/router";
import Vue from "vue"
import store from "../store"

// 全局工具/函数封装
export default {
    CheckLoginState() {
        let token = localStorage.getItem("token")
        if(!token){
            store["_mutations"]["isForceLogin/updateIsForceLogin"][0](true)

            Vue.prototype.$toast("请先登录！")
            setTimeout(() => {
                router.push("/mine")
            }, 1000);
            return false
        }
        return true
    }
}