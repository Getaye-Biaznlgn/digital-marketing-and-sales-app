<template>
<transition>
  <div class="position-fixed wrapper mx-4 top-0 end-0" v-if="isVisible">
    <div
      :class="isSucceed ? 'alert-success' : 'alert-danger'"
      class="alert alert-dismissible fade show"
      role="alert"
    >
      <strong v-if="isSucceed">Good job!</strong>
      <strong v-else>Sorry!</strong>
      {{ message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  </div>
  </transition>
</template>

<script>
export default {
  props: ["isSucceed", "message", "isVisible"],
};
</script>

<style scoped>
.wrapper {
  width: 80%;
}

/* modal transition */
.v-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.v-enter-active {
  transition: all 0.3s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.v-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.v-leave-active {
  transition: all 0.3s ease-in;
}
.v-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>
