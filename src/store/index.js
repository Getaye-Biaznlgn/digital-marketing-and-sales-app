import { createStore } from 'vuex'
import apiClient from '@/resources/baseUrl';
import auth from './auth'
export default createStore({
  state: {
    isLoading:false,
    categories:[],
    products:[]
  },
  getters: {
    isLoading(state){
      return state.isLoading
    },
    categories(state){
      return state.categories
    },
    products(state){
      return state.products
    }
  },
  mutations: {
    setIsLoading(state, payload){
      state.isLoading= payload
    },
    setCategories(state, payload){
      state.categories= payload
    },
    setProducts(state, payload){
      state.products= payload
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
    async fetchProducts(context) {
      context.commit("setIsLoading", true);
      context.isLoading = true;
      try {
        var response = await apiClient.get("/api/products");
        if (response.status === 200) {
          context.commit("setProducts", response.data.data);
        } else {
          throw "faild to load products";
        }
      } finally {
        context.commit("setIsLoading", false);
      }
    },
  },
  modules: {
    auth
  }
});
