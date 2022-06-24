<template>
  <nav class="d-flex shadow-sm justify-content-between py-2 px-3 bg-blue-black">
    <div>
      <strong class="fw-bold text-light"
        ><span class="brand-color1">RENSYS </span>
        <span class="brand-color2">ENGINEERING</span></strong
      >
    </div>
    <div class="dropdown text-light">
      <div
        class="btn dropdown-toggl border py-0 my-0 text-light d-flex"
        type="button"
        id="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span class="align-self-center text-white px-1 rounded"
          ><i class="fas fa-user fs-4 fw-bold"></i
        ></span>
        <div class="d-flex flex-column">
          <span class="fw-bold small text-center text-capitalize">{{user?.first_name+' '+user?.last_name}}</span>
          <span class="small text-capitalize">{{user?.manager_city}}</span>
        </div>
      </div>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li><a class="dropdown-item" @click="logout" role="button">Logout</a></li>
        
      </ul>
    </div>
    
  </nav>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import {useRouter} from 'vue-router'
import apiClient from '../resources/baseUrl';
const store = useStore();
 const router = useRouter()
const user = computed(() => store.getters.user);
console.log("user", user.value);
const  logout=async function() {
      try {
        var response = await apiClient.post("/api/logout");
        if (response.status === 200) {
          apiClient.defaults.headers.common["Authorization"] = null;
          store.commit("setToken", "");
          store.commit("setIsAuthenticated", false);

          localStorage.removeItem("tokenA");
          localStorage.removeItem("user");
          router.push({ name: "TheLogin" });
        } else {
          alert('False')
          throw "faild";
        }
      } catch (e) {
        console.log(e);
      } finally {
        // this.isLoading = false;
      }
    }
</script>
<style scoped>
.bg-blue-black {
  background-color: #062539;
}
.brand-color1 {
  color: #ff7e00;
}
.brand-color2 {
  color: #457139;
}

</style>
