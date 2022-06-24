<template>
   <div class="bg-light-grey p-2">
       <span
      @click="$router.back()"
      role="button"
      class="text-dark-blue pe-2 fw-bold fs-5"
      ><i class="fas fa-arrow-left"></i
    ></span>
    <span class="fw-bold fs-5">{{title}}</span>
    <div>
      <slot/>
    </div>
    
   </div>
</template>

<script>
export default {
  props:{
    title:{
        default:'Title'
    }
  }
}
</script>

<style>

</style>