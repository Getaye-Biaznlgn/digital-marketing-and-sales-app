<template>
  <nav class="navbar-light side-bar">
    <div class="fw-bold fs-5 ps-1 my-2">Menu</div>
    <ul class="navbar-nav pt-2 px-2">
      <TheSidebarItem
        @click="setSelected('TheDashboard')"
        :isSelected="selectedRoute == 'TheDashboard'"
        label="Dashboard"
        routeName="TheDashboard"
      />
      <TheSidebarItem
        @click="setSelected('TheProduct')"
        :isSelected="selectedRoute == 'TheProduct'"
        label="Product"
        routeName="TheProduct"
      />
      <TheSidebarItem
        @click="setSelected('TheOrder')"
        :isSelected="selectedRoute == 'TheOrder'"
        label="Order"
        routeName="TheOrder"
      />
      <TheSidebarItem
        @click="setSelected('TheCustomer')"
        :isSelected="selectedRoute == 'TheCustomer'"
        label="Customer"
        routeName="TheCustomer"
      />
      <TheSidebarItem
        @click="setSelected('TheShop')"
        :isSelected="selectedRoute == 'TheShop'"
        label="Shop"
        routeName="TheShop"
      />
      <TheSidebarItem
        @click="setSelected('TheAgent')"
        :isSelected="selectedRoute == 'TheAgent'"
        label="Agents"
        routeName="TheAgent"
      />
      <TheSidebarItem
        @click="setSelected('TheRevenue')"
        :isSelected="selectedRoute == 'TheRevenue'"
        label="Revenue"
        routeName="TheRevenue"
      />
      <TheSidebarItem
        @click="setSelected('TheSales')"
        :isSelected="selectedRoute == 'TheSales'"
        label="Sales"
        routeName="TheSales"
      />
      <TheSidebarItem
        @click="setSelected('ProductCategory')"
        :isSelected="selectedRoute == 'ProductCategory'"
        label="Product Category"
        routeName="ProductCategory"
      />
      <TheSidebarItem
        @click="setSelected('SupportedLanguage')"
        :isSelected="selectedRoute == 'SupportedLanguage'"
        label="Languages"
        routeName="SupportedLanguage"
      />
      <TheSidebarItem
      @click="setSelected('TheSetting')"
        :isSelected="selectedRoute == 'TheSetting'"
       label="Setting" routeName="TheSetting" />
    </ul>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import TheSidebarItem from "./SidebarItem.vue";
var selectedRoute = ref("");
const setSelected = function (name) {
  selectedRoute.value = name;
};
</script>
