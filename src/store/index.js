import Vue from 'vue'
import Vuex from 'vuex'
import showshadow from './showshadow'
import isForceLogin from './isForceLogin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    showshadow,
    isForceLogin
  }
})
