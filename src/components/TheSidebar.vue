<template>
  <nav class="navbar-light side-bar">
    <div class="fw-bold fs-5 ps-1 my-2">Menu</div>
    <ul class="navbar-nav pt-2 px-2">
      <TheSidebarItem
        v-if="hasPermissionTo('view dashboard')"
        @click="setSelected('TheDashboard')"
        :isSelected="selectedRoute == 'TheDashboard'"
        label="Dashboard"
        routeName="TheDashboard"
        ><i class="fas fa-tachometer-alt"></i
      ></TheSidebarItem>
      <TheSidebarItem
        @click="setSelected('TheProduct')"
        :isSelected="selectedRoute == 'TheProduct'"
        label="Product"
        routeName="TheProduct"
      >
        <i class="fa-solid fa-solar-panel"></i>
      </TheSidebarItem>

      <TheSidebarItem

      v-if="hasPermissionTo('view order')"
        @click="setSelected('TheOrder')"
        :isSelected="selectedRoute == 'TheOrder'"
        label="Order"
        routeName="TheOrder"
      >
        <i class="fa-solid fa-cart-shopping"></i>
      </TheSidebarItem>
      <TheSidebarItem
       v-if="hasPermissionTo('view customer')"
        @click="setSelected('TheCustomer')"
        :isSelected="selectedRoute == 'TheCustomer'"
        label="Customer"
        routeName="TheCustomer"
        ><i class="fas fa-user-friends"></i
      ></TheSidebarItem>
      <TheSidebarItem
       v-if="hasPermissionTo('view shop')"
        @click="setSelected('TheShop')"
        :isSelected="selectedRoute == 'TheShop'"
        label="Shop"
        routeName="TheShop"
      >
        <i class="fa-solid fa-store"></i>
      </TheSidebarItem>
      <TheSidebarItem
      v-if="hasPermissionTo('view agent')"
        @click="setSelected('TheAgent')"
        :isSelected="selectedRoute == 'TheAgent'"
        label="Agent"
        routeName="TheAgent"
      >
        <i class="fas fa-user"></i>
      </TheSidebarItem>
      <TheSidebarItem
      v-if="hasPermissionTo('view revenue')"
        @click="setSelected('TheRevenue')"
        :isSelected="selectedRoute == 'TheRevenue'"
        label="Revenue"
        routeName="TheRevenue"
      >
        <i class="fas fa-chart-line"></i>
      </TheSidebarItem>
      <TheSidebarItem
       v-if="hasPermissionTo('view sale')"
        @click="setSelected('TheSales')"
        :isSelected="selectedRoute == 'TheSales'"
        label="Sales"
        routeName="TheSales"
      >
        <i class="fa fa-money-bill"></i>
      </TheSidebarItem>
      <TheSidebarItem
      v-if="hasPermissionTo('view category')"
        @click="setSelected('ProductCategory')"
        :isSelected="selectedRoute == 'ProductCategory'"
        label="Product Category"
        routeName="ProductCategory"
      >
        <i class="fas fa-layer-group"></i>
      </TheSidebarItem>
      <TheSidebarItem
       v-if="user?.role?.name==='admin'"
        @click="setSelected('TheEmployee')"
        :isSelected="selectedRoute == 'TheEmployee'"
        label="Employee"
        routeName="TheEmployee"
      >
        <i class="fas fa-user"></i>
      </TheSidebarItem>
      <TheSidebarItem
      v-if="user?.role?.name==='admin'"
        @click="setSelected('TheRole')"
        :isSelected="selectedRoute == 'TheRole'"
        label="Role"
        routeName="TheRole"
      >
        <i class="fa fa-universal-access"></i>
      </TheSidebarItem>

      <TheSidebarItem
       v-if="hasPermissionTo('view language')"
        @click="setSelected('SupportedLanguage')"
        :isSelected="selectedRoute == 'SupportedLanguage'"
        label="Languages"
        routeName="SupportedLanguage"
      >
        <i class="fa fa-language"></i>
      </TheSidebarItem>

      <TheSidebarItem
      v-if="hasPermissionTo('view setting')"
        @click="setSelected('TheSetting')"
        :isSelected="selectedRoute == 'TheSetting'"
        label="Setting"
        routeName="TheSetting"
      >
        <i class="fa fa-gear"></i>
      </TheSidebarItem>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import TheSidebarItem from "./SidebarItem.vue";
var selectedRoute = ref("");
const store = useStore();
var user = computed(() => store.getters.user);
const setSelected = function (name) {
  console.log('user', user);
  selectedRoute.value = name;
};
var hasPermissionTo = function (act) {
  let index = user.value?.role?.permissions.findIndex(
    (per) => per.name.toLowerCase() === act.toLowerCase()
  );
  if (!isNaN(index) && index !== -1) return true;
  return false;
};
</script>
