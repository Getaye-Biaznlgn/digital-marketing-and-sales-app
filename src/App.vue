<template>
  <router-view/>
</template>

<script>
import apiClient from './resources/baseUrl'
export default {
    beforeCreate() {
    if (localStorage.getItem("tokenA")) {
      let token = localStorage.getItem("tokenA");
      this.$store.commit("setToken", token);
      this.$store.commit("setIsAuthenticated", true);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    // if (localStorage.getItem("user")) {
    //   let user = localStorage.getItem("user");
    //   // console.log("user", user);
    //   this.$store.commit("setUser", JSON.parse(user));
    // }
  },
  created(){
    this.$store.dispatch('fetchUser');
  }
}
</script>

<style>

</style>