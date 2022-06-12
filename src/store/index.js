import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading:false
  },
  getters: {
    isLoading(state){
      return state.isLoading
    }
  },
  mutations: {
    setIsLoading(state, payload){
      state.isLoading= payload
    }
  },
  actions: {
  },
  modules: {
  }
});
