import { createStore } from 'vuex'
import apiClient from '@/resources/baseUrl';
export default createStore({
  state: {
    isLoading:false,
    categories:[]
  },
  getters: {
    isLoading(state){
      return state.isLoading
    },
    categories(state){
      return state.categories
    }
  },
  mutations: {
    setIsLoading(state, payload){
      state.isLoading= payload
    },
    setCategories(state, payload){
      state.categories= payload
    }
  },
  actions: {
    async fetchCategories(context) {
      context.commit("setIsLoading", true);
      context.isLoading = true;
      try {
        var response = await apiClient.get("/api/categories");
        if (response.status === 200) {
          context.commit("setCategories", response.data);
          console.log('categories', context.state.categories)
        } else {
          throw "faild to load categories";
        }
      } finally {
        context.commit("setIsLoading", false);
      }
    },
  },
  modules: {
  }
});
