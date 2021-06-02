import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://kumanxuan1.f3322.net:8001',
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config=>{
    // 发送请求之前执行这里的代码
    // console.log("config:",config);  // config 是axios封装好的关于本次请求详情的对象

    // 在这里可以做一些发送请求前的准备工作
    // 把token添加请求头
    // let token = localStorage.getItem("token")
    // if(token){
    //     // 把token设置到请求头中
    // }

    // 需要返回config才能继续发送请求
    return config
},err=>{
    return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res=>{
    // 统一管理错误提示
    let data = res.data
    if(data.errno !== 0){
        console.log("响应拦截器中：", data.errmsg || "网络错误");
    }

    // 这里返回的就是then中的res
    return data
},err=>{
    return Promise.reject(err)
})

export default instance

// 执行顺序：请求拦截器 => 响应拦截器 => then/catch