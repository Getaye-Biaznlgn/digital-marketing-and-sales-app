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
  background-color: rgba(0, 0, 0, 0.803);
  border-radius: 10px;
  color:#fff !important;
}
</style>