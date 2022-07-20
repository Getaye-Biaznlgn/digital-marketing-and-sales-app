import apiClient from "@/resources/baseUrl";
export default {
    state: {
      isAuthenticated: false,
      token: null,
      user: null,
    },
    getters: {
      isAuthenticated(state) {
        return state.isAuthenticated;
      },
      token(state) {
        return state.token;
      },
      user(state) {
        return state.user;
      },
    },
    mutations: {
      setIsAuthenticated(state, payload) {
        state.isAuthenticated = payload;
      },
      setToken(state, payload) {
        state.token = payload;
      },
      setUser(state, payload) {
        state.user = payload;
      },
    },
    actions: {
      async fetchUser(context) {
        context.commit("setIsLoading", true);
        context.isLoading = true;
        try {
          var response = await apiClient.get("/api/user");
          if (response.status === 200) {
            context.commit("setUser", response.data.user);
            console.log('-user-data-', response.data.user);
          } else {
            throw "faild to load user";
          }
        } finally {
          context.commit("setIsLoading", false);
        }
      },
    },
  };
  