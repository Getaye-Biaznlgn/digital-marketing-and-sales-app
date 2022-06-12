<template>
  <nav class="navbar-light side-bar">
    <div class="fw-bold fs-5 ps-1 my-2">Menu</div>
    <ul class="navbar-nav pt-2 px-2">
      <TheSidebar label="Dashboard" routeName="TheDashboard" />
      <TheSidebar label="Product" routeName="TheProduct" />
      <TheSidebar label="Order" routeName="TheOrder" />
      <TheSidebar label="Customer" routeName="TheCustomer" />
      <TheSidebar label="Shop" routeName="TheShop" />
      <TheSidebar label="Revenue" routeName="TheRevenue" />
      <TheSidebar label="Sales" routeName="TheSales" />
      <TheSidebar label="Setting" routeName="TheSetting" />
    </ul>
  </nav>
</template>

<script setup>
import TheSidebar from './SidebarItem.vue'
</script>


