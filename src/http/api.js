// api.js 用于统一管理项目接口
import axios from './request'

// 请求首页数据
export const GetHomeData = () => axios.get('/index/index')
// 请求历史记录与热门
export const GetHisHotData = () => axios.get('/search/index')
// 请求搜索提示
// export const GetSearchTipsData = (val) => axios.get('/search/helper', { 
//     params:{ keyword: val }
// })
export const GetSearchTipsData = (params) => axios.get('/search/helper', { params })
// 清除历史记录
export const ClearHisData = () => axios.post('/search/clearhistory')
// 获取搜索产品内容
export const GetSearchData = (params) => axios.get("/goods/list",{ params });
// 注册或登录
export const LoginByWeb = (params) => axios.post("/auth/loginByWeb", params);
// 产品明细
export const GetProductDetail = (params) => axios.get("/goods/detail", { params });
// 相关产品
export const GetRelated = (params) => axios.get("/goods/related", { params });