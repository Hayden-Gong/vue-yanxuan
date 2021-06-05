export default({
    namespaced: true,
    state: {
        isForceLogin: false
    },
    mutations: {
        updateIsForceLogin(state, payload){
            state.isForceLogin = payload
        }
    },
    actions: {
    },
    modules: {
    }
  })
  