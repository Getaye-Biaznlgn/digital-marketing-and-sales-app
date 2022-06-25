<template>
      <li>
        <router-link
          class="nav-link py-2 ps-2 fw-bold" :class="{active: isSelected}"
          :to="{ name: routeName}"
          ><span class="me-2"><slot/></span>{{label}}</router-link
        >
      </li>
</template>

<script>
 export default{
    props:{
       label:{
        type: String,
        required: true
       },
       routeName:{
        type: String,
        required: true
       },
       isSelected:{
        default:false
       }
    },
 }
</script>

<style>
.active {
  background-color: #062539;
  border-radius: 10px;
  color:#ff7e00 !important;
}
</style>