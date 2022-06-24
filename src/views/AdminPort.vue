<template>
  <the-header></the-header>
  <div class="d-flex">
    <div class="sidebar shadow">
      <the-sidebar></the-sidebar>
    </div>
    <div class="container-fluid position-relative px-0">
      <router-view></router-view>
    </div>
  </div>

  <div
    v-if="store.getters.isLoading"
    class="route-loading p-0 position-fixed top-0 start-0 bottom-0 end-0 w-100 h-100"
  >
    <div class="loading-spinner">
      <img src="../assets/loader.gif" alt="slow connection" />
    </div>
  </div>
</template>

<script setup>
import TheSidebar from "../components/TheSidebar.vue";
import TheHeader from "../components/TheHeader.vue";
import {useStore} from 'vuex'
const store = useStore()
store.dispatch('fetchCategories');
store.dispatch('fetchProducts')
</script>

<style>
.route-loading {
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.sidebar {
  min-height: 100vh;
  width: 18em !important;
}
.loading-spinner {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* z-index: 1; */
}
/*  */
</style>


