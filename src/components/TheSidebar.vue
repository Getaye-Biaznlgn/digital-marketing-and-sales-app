<template>
  <nav class="navbar-light side-bar">
    <div class="fw-bold fs-5 ps-1 my-2">Menu</div>
    <ul class="navbar-nav pt-2 px-2">
      <TheSidebarItem label="Dashboard" routeName="TheDashboard" />
      <TheSidebarItem label="Product" routeName="TheProduct" />
      <TheSidebarItem label="Order" routeName="TheOrder" />
      <TheSidebarItem label="Customer" routeName="TheCustomer" />
      <TheSidebarItem label="Shop" routeName="TheShop" />
      <TheSidebarItem label="Agents" routeName="TheAgent" />
      <TheSidebarItem label="Revenue" routeName="TheRevenue" />
      <TheSidebarItem label="Sales" routeName="TheSales" />
      <TheSidebarItem label="Product Category" routeName="ProductCategory" />
      <TheSidebarItem label="Languages" routeName="SupportedLanguage" />
      <TheSidebarItem label="Setting" routeName="TheSetting" />

    </ul>
  </nav>
</template>

<script setup>
import TheSidebarItem from './SidebarItem.vue'
</script>


