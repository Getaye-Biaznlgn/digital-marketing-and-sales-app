<template>
      <li>
        <router-link
          class="nav-link py-2 ps-2 fw-bold"
          :to="{ name: routeName}"
          >{{label}}</router-link
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
       }
    },
    setup(){
        
        
    }
 }
  
</script>

<style>
.active {
  background-color: #062539;
  border-radius: 10px;
  color:#ff7e00 !important;
}
</style>